import { formatDate, withRuntype } from '../../utils';
import { TripletexBase } from '../base';
import { getTokenResponseRt } from './models/session-token';

export interface CreateSessionTokenInput {
  employeeToken: string;
  consumerToken: string;
  expirationDate: Date;
}

export class TripletexToken extends TripletexBase {
  createSessionToken(args: CreateSessionTokenInput) {
    const call = this.unauthenticatedCall() //
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

    return this.performRequest(() => call({ input: args }));
  }
}
