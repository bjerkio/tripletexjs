import omitEmpty from 'omit-empty';
import { JsonRoot } from 'typical-fetch/dist/types';
import { toString } from '../../utils';
import { CreateOrderInput, CreateOrderLineInput } from './types';

export function makeOrderLineInput(input: CreateOrderLineInput) {
  const {
    productId,
    orderId,
    inventoryId,
    inventoryLocationId,
    vatTypeId,
    ...orderLine
  } = input;

  return omitEmpty({
    ...orderLine,
    product: {
      id: productId,
    },
    order: {
      id: orderId,
    },
    inventory: inventoryId && {
      id: inventoryId,
    },
    inventoryLocation: inventoryLocationId && {
      id: inventoryLocationId,
    },
    vatType: vatTypeId && {
      id: vatTypeId,
    },
  }) as JsonRoot;
}

export function makeOrderInput(input: CreateOrderInput) {
  const {
    customerId,
    contactId,
    ourContactId,
    ourContactEmployeeId,
    projectId,
    departmentId,
    currencyId,
    deliveryAddressId,
    ...order
  } = input;

  return omitEmpty({
    ...order,
    orderDate: order.orderDate && toString(order.orderDate),
    deliveryDate: order.deliveryDate && toString(order.deliveryDate),
    // subscriptionPeriodStart:
    //   order.subscriptionPeriodStart && toString(order.subscriptionPeriodStart),
    // subscriptionPeriodEnd:
    //   order.subscriptionPeriodEnd && toString(order.subscriptionPeriodEnd),
    customer: customerId && {
      id: customerId,
    },
    contact: contactId && {
      id: contactId,
    },
    ourContact: ourContactId && {
      id: ourContactId,
    },
    ourContactEmployee: ourContactEmployeeId && {
      id: ourContactEmployeeId,
    },
    project: projectId && {
      id: projectId,
    },
    department: departmentId && {
      id: departmentId,
    },
    currency: currencyId && {
      id: currencyId,
    },
    deliveryAddress: deliveryAddressId && {
      id: deliveryAddressId,
    },
  }) as JsonRoot;
}
