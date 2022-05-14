import { DefaultTripletexInputs } from '../../types';

export type ListSubscriptionsInput = DefaultTripletexInputs;

export interface CreateSubscriptionInput {
  /**
   * Event name (from /v2/event) you wish to subscribe to.
   *
   * Form should be: subject.verb.
   */
  event: string;

  /**
   * @example https://username:password@myintegration.example/tripletexCallback
   */
  targetUrl: string;

  /**
   * The fields in the object delivered
   * with the notification callback, nested as in other API calls.
   */
  fields?: string[];

  /**
   * Custom authentication header name
   */
  authHeaderName?: string;

  /**
   * Custom authentication header value (write only)
   */
  authHeaderValue?: string;
}
