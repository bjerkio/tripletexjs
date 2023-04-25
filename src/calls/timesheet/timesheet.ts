import omitEmpty from 'omit-empty';
import {
  formatDate,
  formatMonthYear,
  serializeQuery,
  withRuntype,
} from '../../utils';
import { TripletexBase } from '../base';
import {
  addTimesheetResponseRt,
  listTimesheetResponseRt,
} from './models/timesheet';
import { getTimesheetMonthResponseRt } from './models/timesheet-month';
import {
  GetMonthByMonthNumberInput,
  ListTimesheetEntriesInput,
  TimesheetEntryInput,
  UpdateTimesheetEntryInput,
} from './types';
export * from './types';
export * from './models/timesheet';
export * from './models/timesheet-month';

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

  updateEntries(entries: UpdateTimesheetEntryInput[]) {
    const call = this.authenticatedCall() //
      .path('/v2/timesheet/entry/list')
      .body(() => {
        return entries.map(input => {
          const entry: Record<string, any> = {
            id: input.id,
            employee: {
              id: input.employeeId,
            },
            activity: {
              id: input.activityId,
            },
            date: formatDate(input.date),
            hours: input.hours,
            comment: input.comment,
          };

          if (input.projectId) {
            entry.project = {
              id: input.projectId,
            };
          }

          return omitEmpty(entry) as Record<string, any>;
        });
      })
      .method('put')
      .parseJson(withRuntype(listTimesheetResponseRt))
      .build();

    return this.performRequest(sessionToken => call({ sessionToken }));
  }

  addEntry(input: TimesheetEntryInput) {
    type Args = { input: TimesheetEntryInput };
    const call = this.authenticatedCall()
      .args<Args>()
      .path('/v2/timesheet/entry')
      .body(({ input }: Args) => {
        const entry: Record<string, any> = {
          employee: {
            id: input.employeeId,
          },
          activity: {
            id: input.activityId,
          },
          date: formatDate(input.date),
          hours: input.hours,
          comment: input.comment,
        };

        if (input.projectId) {
          entry.project = {
            id: input.projectId,
          };
        }

        return omitEmpty(entry) as Record<string, any>;
      })
      .method('post')
      .parseJson(withRuntype(addTimesheetResponseRt))
      .build();

    return this.performRequest(sessionToken => call({ input, sessionToken }));
  }

  addEntries(entries: TimesheetEntryInput[]) {
    const call = this.authenticatedCall() //
      .path('/v2/timesheet/entry/list')
      .body(() => {
        return entries.map(input => {
          const entry: Record<string, any> = {
            employee: {
              id: input.employeeId,
            },
            activity: {
              id: input.activityId,
            },
            date: formatDate(input.date),
            hours: input.hours,
            comment: input.comment,
          };

          if (input.projectId) {
            entry.project = {
              id: input.projectId,
            };
          }

          return omitEmpty(entry) as Record<string, any>;
        });
      })
      .method('post')
      .parseJson(withRuntype(listTimesheetResponseRt))
      .build();

    return this.performRequest(sessionToken => call({ sessionToken }));
  }

  getMonthByMonthNumber(input: GetMonthByMonthNumberInput) {
    const call = this.authenticatedCall() //
      .args<{
        input: GetMonthByMonthNumberInput;
      }>()
      .path('/v2/timesheet/month/byMonthNumber')
      .query(({ input: { monthYear, ...q } }) => ({
        ...serializeQuery(q),
        monthYear: formatMonthYear(monthYear),
      }))
      .method('get')
      .parseJson(withRuntype(getTimesheetMonthResponseRt))
      .build();

    return this.performRequest(sessionToken => call({ input, sessionToken }));
  }
}
