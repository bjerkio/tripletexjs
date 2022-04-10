import * as rt from 'runtypes';
import { multipleValuesEnvelope } from '../../../utils';

const activityRt = rt.Record({
  id: rt.Number,
  name: rt.String,
  number: rt.String,
  description: rt.String,
  activityType: rt.Union(
    rt.Literal('GENERAL_ACTIVITY'),
    rt.Literal('PROJECT_GENERAL_ACTIVITY'),
    rt.Literal('PROJECT_SPECIFIC_ACTIVITY'),
    rt.Literal('TASK'),
  ),
  isProjectActivity: rt.Boolean,
  isGeneral: rt.Boolean,
  isTask: rt.Boolean,
  isDisabled: rt.Boolean,
  isChargeable: rt.Boolean,
  rate: rt.Number,
  costPercentage: rt.Number,
  displayName: rt.String,
});

export type Activity = rt.Static<typeof activityRt>;

export const listActivityResponseRt = multipleValuesEnvelope(activityRt);
