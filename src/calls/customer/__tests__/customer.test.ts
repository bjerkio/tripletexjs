import nock from 'nock';
import { invariant } from 'ts-invariant';
import { parseRuntypeValidationError } from '../../../utils';
import { TripletexCustomer } from '../customer';

const baseUrl = process.env.BASE_URL || 'https://api.tripletex.io/';
const sessionToken = process.env.SESSION_TOKEN || 'a-session-token';

describe('activity class', () => {
  let client: TripletexCustomer;

  beforeEach(() => {
    client = new TripletexCustomer({ baseUrl }, sessionToken);
  });

  it('should list activities', async () => {
    nock(baseUrl, { encodedQueryParams: true })
      .get('/v2/customer')
      .reply(200, {
        fullResultSize: 1,
        from: 0,
        count: 1,
        versionDigest: "'If-None-Match' header not specified",
        values: [
          {
            id: 11289298,
            version: 1,
            url: 'api.tripletex.io/v2/customer/11289298',
            name: 'Banana Airlines AB',
            organizationNumber: '',
            supplierNumber: 0,
            customerNumber: 10001,
            isSupplier: false,
            isCustomer: true,
            isInactive: false,
            accountManager: {
              id: 1734852,
              url: 'api.tripletex.io/v2/employee/1734852',
            },
            email: '',
            invoiceEmail: '',
            overdueNoticeEmail: '',
            bankAccounts: [],
            phoneNumber: '',
            phoneNumberMobile: '',
            description: '',
            language: 'NO',
            displayName: 'Banana Airlines AB (10001)',
            isPrivateIndividual: false,
            singleCustomerInvoice: false,
            invoiceSendMethod: 'EMAIL',
            emailAttachmentType: 'LINK',
            postalAddress: {
              id: 26087367,
              url: 'api.tripletex.io/v2/address/26087367',
            },
            physicalAddress: {
              id: 26087368,
              url: 'api.tripletex.io/v2/address/26087368',
            },
            deliveryAddress: null,
            category1: null,
            category2: null,
            category3: null,
            invoicesDueIn: 14,
            invoicesDueInType: 'DAYS',
            currency: { id: 1, url: 'api.tripletex.io/v2/currency/1' },
            bankAccountPresentation: [],
            ledgerAccount: {
              id: 31925215,
              url: 'api.tripletex.io/v2/ledger/account/31925215',
            },
            isFactoring: false,
          },
        ],
      });
    const activities = await client.list({});

    parseRuntypeValidationError(activities.error);

    invariant(activities.success);

    expect(activities.body.values).toMatchSnapshot();
  });
});
