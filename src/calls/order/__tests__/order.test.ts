import nock, { activate } from 'nock';
import { invariant } from 'ts-invariant';
import { parseRuntypeValidationError } from '../../../utils';
import { TripletexOrder } from '../order';

const baseUrl = process.env.BASE_URL || 'https://api.tripletex.io/';
const sessionToken = process.env.SESSION_TOKEN || 'a-session-token';

describe('order', () => {
  let client: TripletexOrder;

  beforeEach(() => {
    client = new TripletexOrder({ baseUrl }, sessionToken);
  });

  it.skip('should list activities', async () => {
    const activities = await client.list({});

    parseRuntypeValidationError(activities.error);

    invariant(activities.success);

    expect(activities.body.values).toMatchSnapshot();
  });

  it('create a order', async () => {
    nock('https://api.tripletex.io:443', { encodedQueryParams: true })
      .post('/v2/order', {
        orderDate: '2022-01-01',
        deliveryDate: '2022-01-01',
        customer: { id: 11289298 },
      })
      .reply(201, {
        value: {
          id: 1580602,
          version: 0,
          url: 'api.tripletex.io/v2/order/1580602',
          customer: {
            id: 11289298,
            url: 'api.tripletex.io/v2/customer/11289298',
          },
          contact: null,
          attn: null,
          receiverEmail: '',
          overdueNoticeEmail: '',
          number: '35630692',
          reference: '',
          department: null,
          orderDate: '2022-01-01',
          project: null,
          invoiceComment: '',
          currency: { id: 1, url: 'api.tripletex.io/v2/currency/1' },
          invoicesDueIn: 14,
          invoicesDueInType: 'DAYS',
          isShowOpenPostsOnInvoices: false,
          isClosed: false,
          deliveryDate: '2022-01-01',
          deliveryAddress: null,
          deliveryComment: '',
          isPrioritizeAmountsIncludingVat: false,
          orderLineSorting: 'PRODUCT',
          orderLines: [],
          isSubscription: false,
          subscriptionDuration: 0,
          subscriptionDurationType: 'MONTHS',
          subscriptionPeriodsOnInvoice: 0,
          subscriptionPeriodsOnInvoiceType: 'MONTHS',
          subscriptionInvoicingTimeInAdvanceOrArrears: 'ADVANCE',
          subscriptionInvoicingTime: 0,
          subscriptionInvoicingTimeType: 'MONTHS',
          isSubscriptionAutoInvoicing: false,
          preliminaryInvoice: {
            id: 1109033,
            url: 'api.tripletex.io/v2/invoice/1109033',
          },
          attachment: [],
          sendMethodDescription: 'Faktura må sendes manuelt.',
          invoiceOnAccountVatHigh: false,
          totalInvoicedOnAccountAmountAbsoluteCurrency: 0,
        },
      });
    const order = await client.create({
      customerId: 11289298,
      orderDate: new Date('2022-01-01'),
      deliveryDate: new Date('2022-01-01'),
    });

    parseRuntypeValidationError(order.error);
    invariant(order.success);

    expect(order.body.value).toMatchSnapshot();
  });

  it('create a order line', async () => {
    nock('https://api.tripletex.io:443', { encodedQueryParams: true })
      .post('/v2/order/orderline', {
        count: 1337,
        product: { id: 21558874 },
        order: { id: 1580602 },
      })
      .reply(201, {
        value: {
          id: 1192712,
          version: 1,
          url: 'api.tripletex.io/v2/order/orderline/1192712',
          product: {
            id: 21558874,
            url: 'api.tripletex.io/v2/product/21558874',
          },
          inventory: { id: 6311, url: 'api.tripletex.io/v2/inventory/6311' },
          description: '',
          count: 1337,
          unitCostCurrency: 0,
          unitPriceExcludingVatCurrency: 0,
          currency: { id: 1, url: 'api.tripletex.io/v2/currency/1' },
          markup: 0,
          discount: 0,
          vatType: { id: 3, url: 'api.tripletex.io/v2/ledger/vatType/3' },
          amountExcludingVatCurrency: 0,
          amountIncludingVatCurrency: 0,
          order: { id: 1580602, url: 'api.tripletex.io/v2/order/1580602' },
          unitPriceIncludingVatCurrency: 0,
          isSubscription: false,
          subscriptionPeriodStart: null,
          subscriptionPeriodEnd: null,
          orderGroup: null,
        },
      });
    const order = await client.createOrderLine({
      orderId: 1580602,
      productId: 21558874,
      count: 1337,
    });

    parseRuntypeValidationError(order.error);
    invariant(order.success);

    expect(order.body.value).toMatchSnapshot();
  });

  it('create multiple order lines', async () => {
    nock('https://api.tripletex.io:443', { encodedQueryParams: true })
      .post('/v2/order/orderline/list', [
        { count: 1337, product: { id: 21558874 }, order: { id: 1580602 } },
        { count: 1338, product: { id: 21558874 }, order: { id: 1580602 } },
      ])
      .reply(201, {
        fullResultSize: 0,
        from: 0,
        count: 2,
        versionDigest: null,
        values: [
          {
            id: 1192909,
            version: 1,
            url: 'api.tripletex.io/v2/order/orderline/1192909',
            product: {
              id: 21558874,
              url: 'api.tripletex.io/v2/product/21558874',
            },
            inventory: {
              id: 6311,
              url: 'api.tripletex.io/v2/inventory/6311',
            },
            description: '',
            count: 1337,
            unitCostCurrency: 0,
            unitPriceExcludingVatCurrency: 0,
            currency: { id: 1, url: 'api.tripletex.io/v2/currency/1' },
            markup: 0,
            discount: 0,
            vatType: { id: 3, url: 'api.tripletex.io/v2/ledger/vatType/3' },
            amountExcludingVatCurrency: 0,
            amountIncludingVatCurrency: 0,
            order: { id: 1580602, url: 'api.tripletex.io/v2/order/1580602' },
            unitPriceIncludingVatCurrency: 0,
            isSubscription: false,
            subscriptionPeriodStart: null,
            subscriptionPeriodEnd: null,
            orderGroup: null,
          },
          {
            id: 1192910,
            version: 1,
            url: 'api.tripletex.io/v2/order/orderline/1192910',
            product: {
              id: 21558874,
              url: 'api.tripletex.io/v2/product/21558874',
            },
            inventory: {
              id: 6311,
              url: 'api.tripletex.io/v2/inventory/6311',
            },
            description: '',
            count: 1338,
            unitCostCurrency: 0,
            unitPriceExcludingVatCurrency: 0,
            currency: { id: 1, url: 'api.tripletex.io/v2/currency/1' },
            markup: 0,
            discount: 0,
            vatType: { id: 3, url: 'api.tripletex.io/v2/ledger/vatType/3' },
            amountExcludingVatCurrency: 0,
            amountIncludingVatCurrency: 0,
            order: { id: 1580602, url: 'api.tripletex.io/v2/order/1580602' },
            unitPriceIncludingVatCurrency: 0,
            isSubscription: false,
            subscriptionPeriodStart: null,
            subscriptionPeriodEnd: null,
            orderGroup: null,
          },
        ],
      });
    const order = await client.createOrderLines([
      {
        orderId: 1580602,
        productId: 21558874,
        count: 1337,
      },
      {
        orderId: 1580602,
        productId: 21558874,
        count: 1338,
      },
    ]);

    parseRuntypeValidationError(order.error);
    invariant(order.success);

    expect(order.body.values).toMatchSnapshot();
  });
});
