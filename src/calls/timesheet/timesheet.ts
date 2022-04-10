import { serializeQuery, withRuntype } from '../../utils';
import { TripletexBase } from '../base';
import { listTimesheetResponseRt } from './models/timesheet';
export * from './models/timesheet';

export interface ListTimesheetEntriesInput {
  /**
   * List of IDs
   */
  id?: string[];

  /**
   * List of IDs
   */
  employeeId?: string[];

  /**
   * List of IDs
   */
  projectId?: string[];

  /**
   * List of IDs
   */
  activityId?: string[];

  /**
   * From and including
   */
  dateFrom: Date;

  /**
   * To and including
   */
  dateTo: Date;

  /**
   * Containing
   */
  comment?: string;

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

export class TripletexTimesheet extends TripletexBase {
  listEntries(input: ListTimesheetEntriesInput) {
    const call = this.authenticatedCall() //
      .args<{
        input: ListTimesheetEntriesInput;
      }>()
      .path('/v2/timesheet/entry')
      .query(args => serializeQuery(args.input))
      .method('get')
      .parseJson(withRuntype(listTimesheetResponseRt))
      .build();

    return this.performRequest(sessionToken => call({ input, sessionToken }));
  }
}
