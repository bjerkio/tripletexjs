import * as rt from 'runtypes';
import {
  multipleValuesEnvelope,
  resourceRef,
  singleValueEnvelope,
} from '../../../utils';

const projectActivityRt = rt.Record({
  id: rt.Number,
  version: rt.Number,
  url: rt.String,
  activity: rt.Record({
    id: rt.Number,
  }),
  project: rt.Record({
    id: rt.Number,
  }),
  startDate: rt.String,
  endDate: rt.String,
  isClosed: rt.Boolean,
  budgetHours: rt.Number,
  budgetHourlyRateCurrency: rt.Number,
  budgetFeeCurrency: rt.Number,
});

export type ProjectActivity = rt.Static<typeof projectActivityRt>;

export const listProjectActivityResponseRt =
  multipleValuesEnvelope(projectActivityRt);
export const createProjectActivityResponseRt =
  singleValueEnvelope(projectActivityRt);
