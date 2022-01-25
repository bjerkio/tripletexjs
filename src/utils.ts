import { CallReturn, TypicalHttpError } from 'typical-fetch';
import * as rt from 'runtypes';

export function pickQueryValues<
  T extends Record<string, unknown>,
  K extends keyof T,
>(subject: T, ...keys: K[]): [key: string, val: string][] {
  return keys
    .map(key => [key, subject[key]])
    .filter(([, val]) => val !== undefined)
    .map(([key, val]) => [key.toString(), val.toString()]);
}

export function pickFromObject<
  T extends Record<string, unknown>,
  K extends keyof T,
>(subject: T, ...keys: K[]): Pick<T, K> {
  const pairs = keys
    .map(key => [key, subject[key]])
    .filter(([, val]) => val !== undefined)
    .map(([key, val]) => [key, val]);
  return Object.fromEntries(pairs);
}

export function withRuntype<T>(validator: rt.Runtype<T>) {
  return (data: unknown) => {
    return validator.check(data);
  };
}

export function multipleValuesEnvelope<T>(type: rt.Runtype<T>) {
  return rt
    .Record({
      from: rt.Number,
      count: rt.Number,
      versionDigest: rt.String.nullable().optional(),
      values: rt.Array(type).asReadonly(),
    })
    .asReadonly();
}

export function singleValueEnvelope<T>(type: rt.Runtype<T>) {
  return rt
    .Record({
      value: type,
    })
    .asReadonly();
}

export async function performRequest<R, E>(
  call: () => Promise<CallReturn<R, E>>,
): Promise<CallReturn<R, E>> {
  let err: unknown;
  for (let n = 0; n <= 3; n++) {
    const res = await call();

    if (res.success) {
      return res;
    }

    const { error } = res;
    err = error;
    if (error instanceof TypicalHttpError && error.status === 429) {
      const resetHeader = error.res.headers?.get('X-Rate-Limit-Reset');
      const secondsToRetry = resetHeader ? Number(resetHeader) : 2;
      const millis = secondsToRetry * 1000 + 100;
      await new Promise(resolve => setTimeout(resolve, millis));
    } else {
      return res;
    }
  }

  return {
    success: false,
    error: err instanceof Error ? err : new Error('Unknown error'),
    body: undefined,
  };
}

export async function fetchWithRetry<T>(call: () => Promise<T>): Promise<T> {
  let err: unknown;
  for (let n = 0; n <= 3; n++) {
    try {
      const ret = await call();
      return ret;
    } catch (error) {
      err = error;
      if (error instanceof TypicalHttpError && error.status === 429) {
        const resetHeader = error.res.headers?.get('X-Rate-Limit-Reset');
        const secondsToRetry = resetHeader ? Number(resetHeader) : 2;
        const millis = secondsToRetry * 1000 + 100;
        await new Promise(resolve => setTimeout(resolve, millis));
      } else {
        throw error;
      }
    }
  }

  throw err;
}
