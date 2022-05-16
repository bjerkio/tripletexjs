import * as rt from 'runtypes';
import { resourceRef, singleValueEnvelope } from '../../../utils';

export const orderLineRt = rt.Record({
  id: rt.Number,
  version: rt.Number,
  product: resourceRef,
  // inventory: inventoryRt,
  // inventoryLocation: inventoryLocationRt,
  description: rt.String,
  count: rt.Number,
  unitCostCurrency: rt.Number,
  unitPriceExcludingVatCurrency: rt.Number,
  markup: rt.Number,
  discount: rt.Number.nullable().optional(),
  vatType: resourceRef,
  order: resourceRef,
  unitPriceIncludingVatCurrency: rt.Number,
  isSubscription: rt.Boolean.nullable().optional(),
  subscriptionPeriodStart: rt.String.nullable().optional(),
  subscriptionPeriodEnd: rt.String.nullable().optional(),
  orderGroup: resourceRef.nullable().optional(),
  currency: resourceRef,
  amountExcludingVatCurrency: rt.Number.nullable().optional(),
  amountIncludingVatCurrency: rt.Number.nullable().optional(),
});

export type OrderLine = rt.Static<typeof orderLineRt>;

// export const listOrderResponseRt = multipleValuesEnvelope(orderRt);
export const createOrderLineResponseRt = singleValueEnvelope(orderLineRt);
