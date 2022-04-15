import * as rt from 'runtypes';
import { multipleValuesEnvelope, resourceRef } from '../../../utils';

// const addressRt = rt.Record({
//   id: rt.Number,
//   version: rt.Number,
//   employee: resourceRef,
//   addressLine1: rt.String,
//   addressLine2: rt.String,
//   postalCode: rt.String,
//   city: rt.String,
//   country: resourceRef,
//   name: rt.String.optional(),
// });

const customerCategoryRt = rt.Record({
  id: rt.Number,
  version: rt.Number,
  name: rt.String,
  number: rt.String,
  description: rt.String,
  type: rt.Number,
});

const companyBankAccountPresentationRt = rt.Record({
  iban: rt.String.nullable().optional(),
  bban: rt.String.nullable().optional(),
  bic: rt.String.nullable().optional(),
  country: resourceRef,
  provider: rt
    .Union(rt.Literal('NETS'), rt.Literal('AUTOPAY'))
    .nullable()
    .optional(),
});

const customerRt = rt.Record({
  id: rt.Number,
  version: rt.Number.nullable().optional(),
  // changes: rt.Array(changeRt),
  name: rt.String,
  organizationNumber: rt.String.nullable().optional(),
  supplierNumber: rt.Number.nullable().optional(),
  customerNumber: rt.Number.nullable().optional(),
  isSupplier: rt.Boolean,
  accountManager: resourceRef,
  email: rt.String.nullable().optional(),
  invoiceEmail: rt.String.nullable().optional(),
  overdueNoticeEmail: rt.String.nullable().optional(),
  bankAccounts: rt.Array(rt.String).nullable().optional(),
  phoneNumber: rt.String.nullable().optional(),
  phoneNumberMobile: rt.String.nullable().optional(),
  description: rt.String.nullable().optional(),
  language: rt.Union(rt.Literal('NO'), rt.Literal('EN'), rt.Literal('SV')),
  isPrivateIndividual: rt.Boolean.nullable().optional(),
  singleCustomerInvoice: rt.Boolean.nullable().optional(),
  invoiceSendMethod: rt.Union(
    rt.Literal('EMAIL'),
    rt.Literal('EHF'),
    rt.Literal('EFAKTURA'),
    rt.Literal('VIPPS'),
    rt.Literal('PAPER'),
    rt.Literal('MANUAL'),
  ),
  emailAttachmentType: rt.Union(rt.Literal('LINK'), rt.Literal('ATTACHMENT')),
  postalAddress: resourceRef,
  physicalAddress: resourceRef,
  deliveryAddress: resourceRef,
  category1: customerCategoryRt.nullable().optional(),
  category2: customerCategoryRt.nullable().optional(),
  category3: customerCategoryRt.nullable().optional(),
  invoicesDueIn: rt.Number.nullable().optional(),
  invoicesDueInType: rt.Union(
    rt.Literal('DAYS'),
    rt.Literal('MONTHS'),
    rt.Literal('RECURRING_DAY_OF_MONTH'),
  ),
  currency: resourceRef.nullable().optional(),
  bankAccountPresentation: rt.Array(companyBankAccountPresentationRt),
  isCustomer: rt.Boolean,
  isInactive: rt.Boolean,
});

export type Customer = rt.Static<typeof customerRt>;

export const listCustomerResponseRt = multipleValuesEnvelope(customerRt);
