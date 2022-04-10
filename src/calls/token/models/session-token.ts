import * as rt from 'runtypes';
import { singleValueEnvelope } from '../../../utils';

const sessionTokenRt = rt.Record({
  expirationDate: rt.String,
  token: rt.String,
});

export type SessionToken = rt.Static<typeof sessionTokenRt>;

export const getTokenResponseRt = singleValueEnvelope(sessionTokenRt);
