import * as rt from 'runtypes';

export const accountRt = rt
  .Record({
    id: rt.Number,
    version: rt.Number,
    number: rt.Number,
    name: rt.String,
    description: rt.String,
    ledgerType: rt.Union(
      rt.Literal('GENERAL'),
      rt.Literal('CUSTOMER'),
      rt.Literal('VENDOR'),
      rt.Literal('EMPLOYEE'),
      rt.Literal('ASSET'),
    ),
    vatLocked: rt.Boolean,
    isCloseable: rt.Boolean,
    isApplicableForSupplierInvoice: rt.Boolean,
    requireReconciliation: rt.Boolean,
    isInactive: rt.Boolean,
    isBankAccount: rt.Boolean,
    isInvoiceAccount: rt.Boolean,
    bankAccountNumber: rt.String,
    bankName: rt.String,
    bankAccountIBAN: rt.String,
    bankAccountSWIFT: rt.String,
  })
  .asPartial();
