import nock, { activate } from 'nock';
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

  it('create project', async () => {
    nock(baseUrl, { encodedQueryParams: true })
      .post('/v2/project', {
        name: 'Test project',
        startDate: '2022-01-01',
        projectManager: { id: 1734852 },
      })
      .reply(201, {
        value: {
          id: 1565024,
          version: 0,
          url: 'api.tripletex.io/v2/project/1565024',
          name: 'Test project',
          number: '35630689',
          displayName: '35630689 Test project',
          description: '',
          projectManager: {
            id: 1734852,
            url: 'api.tripletex.io/v2/employee/1734852',
          },
          department: null,
          mainProject: null,
          startDate: '2022-01-01',
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
              id: 50307,
              url: 'api.tripletex.io/v2/project/hourlyRates/50307',
            },
          ],
          forParticipantsOnly: false,
          participants: [
            {
              id: 16835,
              url: 'api.tripletex.io/v2/project/participant/16835',
            },
          ],
          contact: null,
          attention: null,
          invoiceComment: '',
          invoicingPlan: [],
          preliminaryInvoice: null,
          generalProjectActivitiesPerProjectOnly: false,
          projectActivities: [],
          hierarchyNameAndNumber: '35630689 Test project',
          invoiceDueDate: 0,
          invoiceReceiverEmail: '',
          accessType: 'WRITE',
          useProductNetPrice: false,
          ignoreCompanyProductDiscountAgreement: false,
        },
      });

    const project = await client.create({
      name: 'Test project',
      projectManagerId: 1734852,
      startDate: new Date('2022-01-01'),
    });

    parseRuntypeValidationError(project.error);
    invariant(project.success);

    expect(project.body.value).toMatchSnapshot();
  });

  it('should create projects with main/parent project', async () => {
    nock(baseUrl, { encodedQueryParams: true })
      .post('/v2/project', {
        name: 'Child test project',
        startDate: '2022-01-01',
        displayNameFormat: 'NAME_INCL_PARENT_NAME',
        projectManager: { id: 1734852 },
        mainProject: { id: 1565024 },
      })
      .reply(201, {
        value: {
          id: 1565025,
          version: 0,
          url: 'api.tripletex.io/v2/project/1565025',
          name: 'Child test project',
          number: '35630690',
          displayName: '35630690 Test project - Child test project',
          description: '',
          projectManager: {
            id: 1734852,
            url: 'api.tripletex.io/v2/employee/1734852',
          },
          department: null,
          mainProject: {
            id: 1565024,
            url: 'api.tripletex.io/v2/project/1565024',
          },
          startDate: '2022-01-01',
          endDate: null,
          customer: null,
          isClosed: false,
          isReadyForInvoicing: false,
          isInternal: false,
          isOffer: false,
          isFixedPrice: false,
          projectCategory: null,
          deliveryAddress: null,
          displayNameFormat: 'NAME_INCL_PARENT_NAME',
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
          projectHourlyRates: [],
          forParticipantsOnly: false,
          participants: [
            {
              id: 16836,
              url: 'api.tripletex.io/v2/project/participant/16836',
            },
          ],
          contact: null,
          attention: null,
          invoiceComment: '',
          invoicingPlan: [],
          preliminaryInvoice: null,
          generalProjectActivitiesPerProjectOnly: false,
          projectActivities: [],
          hierarchyNameAndNumber:
            ' . . 35630690 Test project - Child test project',
          invoiceDueDate: 0,
          invoiceReceiverEmail: '',
          accessType: 'WRITE',
          useProductNetPrice: false,
          ignoreCompanyProductDiscountAgreement: false,
        },
      });
    const project = await client.create({
      name: 'Child test project',
      projectManagerId: 1734852,
      startDate: new Date('2022-01-01'),
      displayNameFormat: 'NAME_INCL_PARENT_NAME',
      mainProjectId: 1565024,
    });

    parseRuntypeValidationError(project.error);
    invariant(project.success);

    expect(project.body.value).toMatchSnapshot();
  });

  it('should update projects', async () => {
    nock('https://api.tripletex.io:443', { encodedQueryParams: true })
      .put('/v2/project/1565024', {
        name: 'Updated test project',
        startDate: '2022-05-01',
        displayNameFormat: 'NAME_INCL_PARENT_NAME',
      })
      .reply(200, {
        value: {
          id: 1565024,
          version: 2,
          url: 'api.tripletex.io/v2/project/1565024',
          name: 'Updated test project',
          number: '35630689',
          displayName: '35630689 Updated test project',
          description: '',
          projectManager: {
            id: 1734852,
            url: 'api.tripletex.io/v2/employee/1734852',
          },
          department: null,
          mainProject: null,
          startDate: '2022-05-01',
          endDate: null,
          customer: null,
          isClosed: false,
          isReadyForInvoicing: false,
          isInternal: false,
          isOffer: false,
          isFixedPrice: false,
          projectCategory: null,
          deliveryAddress: null,
          displayNameFormat: 'NAME_INCL_PARENT_NAME',
          reference: '',
          externalAccountsNumber: '',
          discountPercentage: 0,
          vatType: { id: 3, url: 'api.tripletex.io/v2/ledger/vatType/3' },
          fixedprice: 0,
          contributionMarginPercent: 0,
          numberOfSubProjects: 1,
          numberOfProjectParticipants: 1,
          orderLines: [],
          currency: { id: 1, url: 'api.tripletex.io/v2/currency/1' },
          markUpOrderLines: 0,
          markUpFeesEarned: 0,
          isPriceCeiling: false,
          priceCeilingAmount: 0,
          projectHourlyRates: [
            {
              id: 50307,
              url: 'api.tripletex.io/v2/project/hourlyRates/50307',
            },
          ],
          forParticipantsOnly: false,
          participants: [
            {
              id: 16835,
              url: 'api.tripletex.io/v2/project/participant/16835',
            },
          ],
          contact: null,
          attention: null,
          invoiceComment: '',
          invoicingPlan: [],
          preliminaryInvoice: null,
          generalProjectActivitiesPerProjectOnly: false,
          projectActivities: [],
          hierarchyNameAndNumber: '35630689 Updated test project',
          invoiceDueDate: 0,
          invoiceReceiverEmail: '',
          accessType: 'WRITE',
          useProductNetPrice: false,
          ignoreCompanyProductDiscountAgreement: false,
        },
      });
    const project = await client.update(1565024, {
      name: 'Updated test project',
      startDate: new Date('2022-05-01'),
      displayNameFormat: 'NAME_INCL_PARENT_NAME',
    });

    parseRuntypeValidationError(project.error);
    invariant(project.success);

    expect(project.body.value).toMatchSnapshot();
  });
});
