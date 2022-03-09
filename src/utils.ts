import * as rt from 'runtypes';

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
