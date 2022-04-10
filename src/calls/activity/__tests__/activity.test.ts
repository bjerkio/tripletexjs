import nock from 'nock';
import { invariant } from 'ts-invariant';
import { parseRuntypeValidationError } from '../../../utils';
import { TripletexActivity } from '../activity';

const baseUrl = process.env.BASE_URL || 'https://api.tripletex.io/';
const sessionToken = process.env.SESSION_TOKEN || 'a-session-token';

describe('activity class', () => {
  let client: TripletexActivity;

  beforeEach(() => {
    client = new TripletexActivity({ baseUrl }, sessionToken);
  });

  it('should create session token', async () => {
    nock(baseUrl, { encodedQueryParams: true })
      .get('/v2/activity')
      .reply(200, {
        fullResultSize: 4,
        from: 0,
        count: 4,
        versionDigest: "'If-None-Match' header not specified",
        values: [
          {
            id: 45239,
            version: 0,
            name: 'Administrasjon',
            number: '',
            description: '',
            activityType: 'GENERAL_ACTIVITY',
            isProjectActivity: false,
            isGeneral: true,
            isTask: false,
            isDisabled: false,
            isChargeable: false,
            rate: 0,
            costPercentage: 0,
            displayName: 'Administrasjon',
          },
          {
            id: 45240,
            version: 0,
            name: 'Ferie',
            number: '',
            description: '',
            activityType: 'GENERAL_ACTIVITY',
            isProjectActivity: false,
            isGeneral: true,
            isTask: false,
            isDisabled: false,
            isChargeable: false,
            rate: 0,
            costPercentage: 0,
            displayName: 'Ferie',
          },
          {
            id: 45241,
            version: 0,
            name: 'Prosjektadministrasjon',
            number: '',
            description: '',
            activityType: 'PROJECT_GENERAL_ACTIVITY',
            isProjectActivity: true,
            isGeneral: true,
            isTask: false,
            isDisabled: false,
            isChargeable: false,
            rate: 0,
            costPercentage: 0,
            displayName: 'Prosjektadministrasjon',
          },
          {
            id: 45242,
            version: 0,
            name: 'Fakturerbart arbeid',
            number: '',
            description: '',
            activityType: 'PROJECT_GENERAL_ACTIVITY',
            isProjectActivity: true,
            isGeneral: true,
            isTask: false,
            isDisabled: false,
            isChargeable: true,
            rate: 0,
            costPercentage: 0,
            displayName: 'Fakturerbart arbeid',
          },
        ],
      });
    const activities = await client.list({});

    parseRuntypeValidationError(activities.error);

    invariant(activities.success);

    expect(activities.body.values).toMatchInlineSnapshot(`
Array [
  Object {
    "activityType": "GENERAL_ACTIVITY",
    "costPercentage": 0,
    "description": "",
    "displayName": "Administrasjon",
    "id": 45239,
    "isChargeable": false,
    "isDisabled": false,
    "isGeneral": true,
    "isProjectActivity": false,
    "isTask": false,
    "name": "Administrasjon",
    "number": "",
    "rate": 0,
    "version": 0,
  },
  Object {
    "activityType": "GENERAL_ACTIVITY",
    "costPercentage": 0,
    "description": "",
    "displayName": "Ferie",
    "id": 45240,
    "isChargeable": false,
    "isDisabled": false,
    "isGeneral": true,
    "isProjectActivity": false,
    "isTask": false,
    "name": "Ferie",
    "number": "",
    "rate": 0,
    "version": 0,
  },
  Object {
    "activityType": "PROJECT_GENERAL_ACTIVITY",
    "costPercentage": 0,
    "description": "",
    "displayName": "Prosjektadministrasjon",
    "id": 45241,
    "isChargeable": false,
    "isDisabled": false,
    "isGeneral": true,
    "isProjectActivity": true,
    "isTask": false,
    "name": "Prosjektadministrasjon",
    "number": "",
    "rate": 0,
    "version": 0,
  },
  Object {
    "activityType": "PROJECT_GENERAL_ACTIVITY",
    "costPercentage": 0,
    "description": "",
    "displayName": "Fakturerbart arbeid",
    "id": 45242,
    "isChargeable": true,
    "isDisabled": false,
    "isGeneral": true,
    "isProjectActivity": true,
    "isTask": false,
    "name": "Fakturerbart arbeid",
    "number": "",
    "rate": 0,
    "version": 0,
  },
]
`);
  });
});
