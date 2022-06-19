import * as rt from 'runtypes';
import { multipleValuesEnvelope, singleValueEnvelope } from '../../../utils';

const timesheetRt = rt.Record({
  id: rt.Number,
  version: rt.Number,
  project: rt
    .Record({
      id: rt.Number,
    })
    .nullable()
    .optional(),
  activity: rt.Record({
    id: rt.Number,
  }),
  /**
   * TODO: Change to Date when Transform is landed, read more: https://github.com/pelotom/runtypes/pull/191
   */
  date: rt.String,
  hours: rt.Number,
  chargeableHours: rt.Number.optional(),
  employee: rt.Record({
    id: rt.Number,
  }),
  // timeClocks: rt.Array(rt.String),
  comment: rt.String.optional(),
  locked: rt.Boolean,
  chargeable: rt.Boolean.optional(),
  hourlyRate: rt.Number,
  hourlyCost: rt.Number,
  hourlyCostPercentage: rt.Number,
});

export type Timesheet = rt.Static<typeof timesheetRt>;

export const listTimesheetResponseRt = multipleValuesEnvelope(timesheetRt);
export const addTimesheetResponseRt = singleValueEnvelope(timesheetRt);
