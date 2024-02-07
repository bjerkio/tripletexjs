import { serializeQuery, toString, withRuntype } from '../../utils';
import { TripletexBase } from '../base';
import {
  createSubscriptionResponseRt,
  getSubscriptionResponseRt,
  listSubscriptionResponseRt,
  reactivateSubscriptionResponseRt,
} from './models/subscription';
import { CreateSubscriptionInput, ListSubscriptionsInput } from './types';
export * from './types';
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

  reactivateSubscription(id: number) {
    const requestBody = {
      status: "ACTIVE",
    }
    const call = this.authenticatedCall()
      .args<{ id: number }>()
      .path(({ id }) => `/v2/event/subscription/${id}`)
      .method('put')
      .body(requestBody)
      .parseJson(withRuntype(reactivateSubscriptionResponseRt))
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
    type Args = {
      input: CreateSubscriptionInput;
    };
    const call = this.authenticatedCall() //
      .args<Args>()
      .path('/v2/event/subscription')
      .body(({ input }: Args) => {
        const payload: any = input;

        if (input.fields) {
          payload.fields = toString(input.fields);
        }

        return payload;
      })
      .method('post')
      .parseJson(withRuntype(createSubscriptionResponseRt))
      .build();

    return this.performRequest(sessionToken => call({ input, sessionToken }));
  }
}
