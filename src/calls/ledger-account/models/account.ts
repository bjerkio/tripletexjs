import * as rt from 'runtypes';

export const accountRt = rt.Intersect(
  rt
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
    .asPartial(),
  rt
    .Record({
      changes: rt.Array(changeRt),
      url: rt.String,
      type: rt.Union(
        rt.Literal('ASSETS'),
        rt.Literal('EQUITY'),
        rt.Literal('LIABILITIES'),
        rt.Literal('OPERATING_REVENUES'),
        rt.Literal('OPERATING_EXPENSES'),
        rt.Literal('INVESTMENT_INCOME'),
        rt.Literal('COST_OF_CAPITAL'),
        rt.Literal('TAX_ON_ORDINARY_ACTIVITIES'),
        rt.Literal('EXTRAORDINARY_INCOME'),
        rt.Literal('EXTRAORDINARY_COST'),
        rt.Literal('TAX_ON_EXTRAORDINARY_ACTIVITIES'),
        rt.Literal('ANNUAL_RESULT'),
        rt.Literal('TRANSFERS_AND_ALLOCATIONS'),
      ),
      legalVatTypes: rt.Array(vatTypeRt),
    })
    .asPartial()
    .asReadonly(),
);
