import * as rt from 'runtypes';
import { multipleValuesEnvelope, resourceRef } from '../../../utils';

const timesheetMonthRt = rt.Record({
  id: rt.Number,
  version: rt.Number,
  hoursPayout: rt.Number,
  vacationPayout: rt.Number,
  employee: resourceRef,
  timesheetEntries: rt.Array(resourceRef),
  approvedDate: rt.String.nullable().optional(),
  completed: rt.Boolean,
  approvedBy: resourceRef,
  approved: rt.Boolean,
  approvedUntilDate: rt.String.nullable().optional(),
  monthYear: rt.String,
  hourSummary: rt
    .Record({
      sumHours: rt.Number,
      hoursWithPay: rt.Number,
      hourlyWageHoursWithPay: rt.Number,
      standardTime: rt.Number,
      nonChargeableHours: rt.Number,
      chargeableHours: rt.Number,
      nonChargeableHoursWithPay: rt.Number,
      budgetChargeableHours: rt.Number,
    })
    .nullable()
    .optional(),
  flexSummary: rt
    .Record({
      incomingHourBalance: rt.Number,
      outgoingHourBalance: rt.Number,
      change: rt.Number,
    })
    .nullable()
    .optional(),
  vacationSummary: rt
    .Record({
      incomingVacationBalance: rt.Number,
      outgoingVacationBalance: rt.Number,
      vacationTakenInPeriod: rt.Number,
      vacationTakenThisYear: rt.Number,
    })
    .nullable()
    .optional(),
});

export type TimesheetMonth = rt.Static<typeof timesheetMonthRt>;

export const getTimesheetMonthResponseRt =
  multipleValuesEnvelope(timesheetMonthRt);
