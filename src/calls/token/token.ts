import { buildCall } from 'typical-fetch';
import { TripletexClientConfig } from '../../types';
import { defaultBaseUrl, formatDate, withRuntype } from '../../utils';
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
    const call = buildCall() //
      .baseUrl(this.config.baseUrl ?? defaultBaseUrl)
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
