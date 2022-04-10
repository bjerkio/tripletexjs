import { invariant } from 'ts-invariant';
import { buildCall } from 'typical-fetch';
import { TripletexClientConfig } from '../../types';
import { formatDate, withRuntype } from '../../utils';
import { getTokenResponseRt } from './models/session-token';
export * from './models/session-token';

export interface CreateSessionTokenInput {
  employeeToken: string;
  consumerToken: string;
  expirationDate: Date;
}

export class TripletexToken {
  constructor(readonly config: TripletexClientConfig) {}

  createSessionToken(args: CreateSessionTokenInput) {
    invariant(this.config.baseUrl, 'missing baseUrl in config');
    const call = buildCall() //
      .baseUrl(this.config.baseUrl)
      .headers(() => ({
        'User-Agent': this.config.userAgent ?? 'bjerkio-tripletex/3',
      }))
      .args<{
        input: CreateSessionTokenInput;
      }>()
      .path('/v2/token/session/:create')
      .query(args => ({
        ...args.input,
        expirationDate: formatDate(args.input.expirationDate),
      }))
      .method('put')
      .parseJson(withRuntype(getTokenResponseRt))
      .build();

    return call({ input: args });
  }
}
