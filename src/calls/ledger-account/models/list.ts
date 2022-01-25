import * as rt from 'runtypes';
import { multipleValuesEnvelope } from '../../../utils';
import { accountRt } from './account';

export const ledgerAccountListRequest = rt
  .Record({
    id: rt.String,
    number: rt.String,
    isBankAccount: rt.Boolean,
    isInactive: rt.Boolean,
    isApplicableForSupplierInvoice: rt.Boolean,
    ledgerType: rt.Union(
      rt.Literal('GENERAL'),
      rt.Literal('CUSTOMER'),
      rt.Literal('VENDOR'),
      rt.Literal('EMPLOYEE'),
      rt.Literal('ASSET'),
    ),
    isBalanceAccount: rt.Boolean,
    from: rt.Number,
    count: rt.Number,
    sorting: rt.String,
    fields: rt.String,
  })
  .asPartial()
  .asReadonly();

export const listResponseAccountRt = multipleValuesEnvelope(accountRt);
export type ListResponseAccount = rt.Static<typeof listResponseAccountRt>;
