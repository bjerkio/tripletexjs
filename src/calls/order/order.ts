import { serializeQuery, withRuntype } from '../../utils';
import { TripletexBase } from '../base';
import { createOrderResponseRt, listOrderResponseRt } from './models/order';
import {
  createOrderLineResponseRt,
  createOrderLinesResponseRt,
} from './models/order-line';
import { makeOrderInput, makeOrderLineInput } from './serializers';
import {
  CreateOrderInput,
  CreateOrderLineInput,
  ListOrdersInput,
} from './types';
export * from './types';
export * from './models/order';
export * from './models/order-line';

export class TripletexOrder extends TripletexBase {
  list(input?: ListOrdersInput) {
    const call = this.authenticatedCall() //
      .args<{
        input?: ListOrdersInput;
      }>()
      .path('/v2/order')
      .query(args => (args.input ? serializeQuery(args.input) : {}))
      .method('get')
      .parseJson(withRuntype(listOrderResponseRt))
      .build();

    return this.performRequest(sessionToken => call({ input, sessionToken }));
  }

  create(input: CreateOrderInput) {
    type Args = {
      input: CreateOrderInput;
    };
    const call = this.authenticatedCall() //
      .args<Args>()
      .body(({ input }: Args) => {
        return makeOrderInput(input);
      })
      .path('/v2/order')
      .method('post')
      .parseJson(withRuntype(createOrderResponseRt))
      .build();

    return this.performRequest(sessionToken => call({ input, sessionToken }));
  }

  createOrderLine(input: CreateOrderLineInput) {
    type Args = {
      input: CreateOrderLineInput;
    };
    const call = this.authenticatedCall() //
      .args<Args>()
      .path('/v2/order/orderline')
      .body(({ input }: Args) => {
        return makeOrderLineInput(input);
      })
      .method('post')
      .parseJson(withRuntype(createOrderLineResponseRt))
      .build();

    return this.performRequest(sessionToken => call({ input, sessionToken }));
  }

  createOrderLines(input: CreateOrderLineInput[]) {
    type Args = {
      input: CreateOrderLineInput[];
    };
    const call = this.authenticatedCall() //
      .args<Args>()
      .path('/v2/order/orderline/list')
      .body(({ input }: Args) => {
        return input.map(orderLine => makeOrderLineInput(orderLine));
      })
      .method('post')
      .parseJson(withRuntype(createOrderLinesResponseRt))
      .build();

    return this.performRequest(sessionToken => call({ input, sessionToken }));
  }
}
