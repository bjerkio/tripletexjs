import { serializeQuery, withRuntype } from '../../utils';
import { TripletexBase } from '../base';
import { listCustomerResponseRt } from './models/customer';
import { ListCustomersInput } from './types';
export * from './types';
export * from './models/customer';

export class TripletexCustomer extends TripletexBase {
  list(input?: ListCustomersInput) {
    const call = this.authenticatedCall() //
      .args<{
        input?: ListCustomersInput;
      }>()
      .path('/v2/customer')
      .query(args => (args.input ? serializeQuery(args.input) : {}))
      .method('get')
      .parseJson(withRuntype(listCustomerResponseRt))
      .build();

    return this.performRequest(sessionToken => call({ input, sessionToken }));
  }
}
