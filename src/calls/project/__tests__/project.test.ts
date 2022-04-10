import nock from 'nock';
import { invariant } from 'ts-invariant';
import { parseRuntypeValidationError } from '../../../utils';
import { TripletexProject } from '../project';

const baseUrl = process.env.BASE_URL || 'https://api.tripletex.io/';
const sessionToken = process.env.SESSION_TOKEN || 'a-session-token';

describe('activity class', () => {
  let client: TripletexProject;

  beforeEach(() => {
    client = new TripletexProject({ baseUrl }, sessionToken);
  });

  it('should list activities', async () => {
    nock('https://api.tripletex.io:443', { encodedQueryParams: true })
      .get('/v2/project')
      .reply(200, {
        fullResultSize: 1,
        from: 0,
        count: 1,
        versionDigest: "'If-None-Match' header not specified",
        values: [
          {
            id: 1560889,
            version: 0,
            url: 'api.tripletex.io/v2/project/1560889',
            name: 'Test',
            number: '1',
            displayName: '1 Test',
            description: '',
            projectManager: {
              id: 1734852,
              url: 'api.tripletex.io/v2/employee/1734852',
            },
            department: {
              id: 88885,
              url: 'api.tripletex.io/v2/department/88885',
            },
            mainProject: null,
            startDate: '2022-04-04',
            endDate: null,
            customer: null,
            isClosed: false,
            isReadyForInvoicing: false,
            isInternal: false,
            isOffer: false,
            isFixedPrice: false,
            projectCategory: null,
            deliveryAddress: null,
            displayNameFormat: 'NAME_STANDARD',
            reference: '',
            externalAccountsNumber: '',
            discountPercentage: 0,
            vatType: { id: 3, url: 'api.tripletex.io/v2/ledger/vatType/3' },
            fixedprice: 0,
            contributionMarginPercent: 0,
            numberOfSubProjects: 0,
            numberOfProjectParticipants: 1,
            orderLines: [],
            currency: { id: 1, url: 'api.tripletex.io/v2/currency/1' },
            markUpOrderLines: 0,
            markUpFeesEarned: 0,
            isPriceCeiling: false,
            priceCeilingAmount: 0,
            projectHourlyRates: [
              {
                id: 50292,
                url: 'api.tripletex.io/v2/project/hourlyRates/50292',
              },
            ],
            forParticipantsOnly: false,
            participants: [
              {
                id: 16800,
                url: 'api.tripletex.io/v2/project/participant/16800',
              },
            ],
            contact: null,
            attention: null,
            invoiceComment: '',
            invoicingPlan: [],
            preliminaryInvoice: null,
            generalProjectActivitiesPerProjectOnly: false,
            projectActivities: [],
            hierarchyNameAndNumber: '1 Test',
            invoiceDueDate: 0,
            invoiceReceiverEmail: '',
            accessType: 'WRITE',
            useProductNetPrice: false,
            ignoreCompanyProductDiscountAgreement: false,
          },
        ],
      });
    const activities = await client.list({});

    parseRuntypeValidationError(activities.error);

    invariant(activities.success);

    expect(activities.body.values).toMatchSnapshot();
  });
});
