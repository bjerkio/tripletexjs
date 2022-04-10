import * as rt from 'runtypes';
import { multipleValuesEnvelope } from '../../../utils';

const employeeRt = rt.Record({
  id: rt.Number,
});

export type Employee = rt.Static<typeof employeeRt>;

export const listEmployeesResponseRt = multipleValuesEnvelope(employeeRt);
