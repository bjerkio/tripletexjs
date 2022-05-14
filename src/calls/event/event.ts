import { serializeQuery, withRuntype } from '../../utils';
import { TripletexBase } from '../base';
import {
  createSubscriptionResponseRt,
  getSubscriptionResponseRt,
  listSubscriptionResponseRt,
} from './models/subscription';
import { CreateSubscriptionInput, ListSubscriptionsInput } from './types';
export * from './models/subscription';

export class TripletexEvent extends TripletexBase {
  getSubscription(id: number) {
    const call = this.authenticatedCall() //
      .args<{ id: number }>()
      .path(({ id }) => `/v2/event/subscription/${id}`)
      .method('get')
      .parseJson(withRuntype(getSubscriptionResponseRt))
      .build();

    return this.performRequest(sessionToken => call({ id, sessionToken }));
  }

  deleteSubscription(id: number) {
    const call = this.authenticatedCall() //
      .args<{ id: number }>()
      .path(({ id }) => `/v2/event/subscription/${id}`)
      .method('delete')
      .build();

    return this.performRequest(sessionToken => call({ id, sessionToken }));
  }

  listSubscriptions(input?: ListSubscriptionsInput) {
    const call = this.authenticatedCall() //
      .args<{
        input?: ListSubscriptionsInput;
      }>()
      .path('/v2/event/subscription')
      .query(args => (args.input ? serializeQuery(args.input) : {}))
      .method('get')
      .parseJson(withRuntype(listSubscriptionResponseRt))
      .build();

    return this.performRequest(sessionToken => call({ input, sessionToken }));
  }

  createSubscription(input: CreateSubscriptionInput) {
    const call = this.authenticatedCall() //
      .args<{
        input: CreateSubscriptionInput;
      }>()
      .path('/v2/event/subscription')
      .body(({ input }) => {
        return {
          ...input,
        };
      })
      .method('post')
      .parseJson(withRuntype(createSubscriptionResponseRt))
      .build();

    return this.performRequest(sessionToken => call({ input, sessionToken }));
  }
}
