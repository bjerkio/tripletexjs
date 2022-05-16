import * as rt from 'runtypes';
import { multipleValuesEnvelope, resourceRef, singleValueEnvelope } from '../../../utils';
import { orderLineRt } from './order-line';

const orderRt = rt.Record({
  id: rt.Number,
  version: rt.Number,
  customer: resourceRef,
  contact: resourceRef,
  attn: resourceRef,
  receiverEmail: rt.String,
  overdueNoticeEmail: rt.String,
  number: rt.String,
  reference: rt.String,
  ourContact: resourceRef,
  ourContactEmployee: resourceRef,
  department: resourceRef,
  orderDate: rt.String,
  project: resourceRef,
  invoiceComment: rt.String,
  currency: resourceRef,
  invoicesDueIn: rt.Number,
  invoicesDueInType: rt.Union(
    rt.Literal('DAYS'),
    rt.Literal('MONTHS'),
    rt.Literal('RECURRING_DAY_OF_MONTH'),
  ),
  isShowOpenPostsOnInvoices: rt.Boolean,
  isClosed: rt.Boolean,
  deliveryDate: rt.String,
  deliveryAddress: resourceRef,
  deliveryComment: rt.String,
  isPrioritizeAmountsIncludingVat: rt.Boolean,
  orderLineSorting: rt.Union(
    rt.Literal('ID'),
    rt.Literal('PRODUCT'),
    rt.Literal('CUSTOM'),
  ),
  orderLines: rt.Array(orderLineRt),
  isSubscription: rt.Boolean,
  subscriptionDuration: rt.Number,
  subscriptionDurationType: rt.Union(rt.Literal('MONTHS'), rt.Literal('YEAR')),
  subscriptionPeriodsOnInvoice: rt.Number,
  subscriptionInvoicingTimeInAdvanceOrArrears: rt.Union(
    rt.Literal('ADVANCE'),
    rt.Literal('ARREARS'),
  ),
  subscriptionInvoicingTime: rt.Number,
  subscriptionInvoicingTimeType: rt.Union(
    rt.Literal('DAYS'),
    rt.Literal('MONTHS'),
  ),
  isSubscriptionAutoInvoicing: rt.Boolean,
});

export type Order = rt.Static<typeof orderRt>;

export const listOrderResponseRt = multipleValuesEnvelope(orderRt);
export const createOrderResponseRt = singleValueEnvelope(orderRt);
