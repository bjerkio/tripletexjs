import { format } from 'date-fns';
import * as rt from 'runtypes';
import { TypicalWrappedError } from 'typical-fetch';

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

export function formatDate(d: Date | number): string {
  return format(d, 'yyyy-MM-dd');
}

export function toString(d: unknown): string | undefined {
  if (!d) {
    return undefined;
  }

  return String(d);
}

export function serializeQuery<T extends Object>(
  query: T,
): Record<string, string> {
  return Object.entries(query).reduce<Record<string, string>>(
    (q, [key, value]) => {
      const stringifiedValue = toString(value);

      if (key && stringifiedValue) {
        console.log(key);
        q[key] = stringifiedValue;
      }

      return q;
    },
    {},
  );
}

export function parseRuntypeValidationError(error: unknown) {
  if (error instanceof TypicalWrappedError) {
    if (error.wrappedError instanceof rt.ValidationError) {
      throw new Error(
        JSON.stringify({
          details: error.wrappedError.details,
          name: error.wrappedError.name,
          code: error.wrappedError.code,
        }),
      );
    }
  }
}
