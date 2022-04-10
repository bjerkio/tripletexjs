import { DefaultTripletexInputs } from '../../types';
import { serializeQuery, withRuntype } from '../../utils';
import { TripletexBase } from '../base';
import { listActivityResponseRt } from './models/activity';
export * from './models/activity';

export interface ListActivityInput extends DefaultTripletexInputs {
  /**
   * List of IDs
   */
  id?: string[];

  /**
   * Containing
   */
  name?: string;

  /**
   * Equals
   */
  number?: string;

  /**
   * Containing
   */
  description?: string;

  isProjectActivity?: boolean;
  isGeneral?: boolean;
  isChargeable?: boolean;
  isTask?: boolean;
  isInactive?: boolean;
}

export class TripletexActivity extends TripletexBase {
  list(input?: ListActivityInput) {
    const call = this.authenticatedCall() //
      .args<{
        input?: ListActivityInput;
      }>()
      .path('/v2/activity')
      .query(args => (args.input ? serializeQuery(args.input) : {}))
      .method('get')
      .parseJson(withRuntype(listActivityResponseRt))
      .build();

    return this.performRequest(sessionToken => call({ input, sessionToken }));
  }
}
