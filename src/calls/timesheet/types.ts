import { DefaultTripletexInputs } from '../../types';

export interface ListTimesheetEntriesInput extends DefaultTripletexInputs {
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
}

// export interface TimeClockInput {
//   date: Date;
//   timeStart: Date;
//   timeStop: Date;
// }

export interface TimesheetEntryInput {
  projectId?: number;
  employeeId: number;
  activityId: number;
  date: Date;
  hours: number;
  comment?: string;
  // TODO: Add timeClocks
  // timeClocks:
}

export interface UpdateTimesheetEntryInput extends TimesheetEntryInput {
  id: number;
}

export interface GetMonthByMonthNumberInput extends DefaultTripletexInputs {
  /**
   * List of IDs
   */
  employeeIds: string[];

  monthYear: Date;
}
