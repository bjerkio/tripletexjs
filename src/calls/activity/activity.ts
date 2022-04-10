import { invariant } from 'ts-invariant';
import { serializeQuery, toString, withRuntype } from '../../utils';
import { listActivityResponseRt } from './models/activity';
import { TripletexBase } from '../base';
export * from './models/activity';

export interface ListActivityInput {
  /**
   * List of IDs
   */
  id?: string;

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

  /**
   * From index
   */
  from?: number;

  /**
   * Number of elements to return
   * @default 1000
   */
  count?: number;
  sorting?: string;
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

    return call({ input });
  }
}
