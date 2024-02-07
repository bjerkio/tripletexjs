import * as rt from 'runtypes';
import { multipleValuesEnvelope, singleValueEnvelope } from '../../../utils';

const subscriptionRt = rt.Record({
  id: rt.Number,
  version: rt.Number,
  event: rt.String,
  targetUrl: rt.String,
  fields: rt.String.nullable().optional(),
  authHeaderName: rt.String.nullable().optional(),
  authHeaderValue: rt.String.nullable().optional(),
  status: rt
    .Union(
      rt.Literal('ACTIVE'),
      rt.Literal('DISABLED'),
      rt.Literal('DISABLED_TOO_MANY_ERRORS'),
      rt.Literal('DISABLED_RATE_LIMIT_EXCEEDED'),
      rt.Literal('DISABLED_MISUSE'),
    )
    .nullable()
    .optional(),
});

export type Subscription = rt.Static<typeof subscriptionRt>;

export const listSubscriptionResponseRt = multipleValuesEnvelope(subscriptionRt);
export const createSubscriptionResponseRt = singleValueEnvelope(subscriptionRt);
export const getSubscriptionResponseRt = singleValueEnvelope(subscriptionRt);
export const reactivateSubscriptionResponseRt = singleValueEnvelope(subscriptionRt);