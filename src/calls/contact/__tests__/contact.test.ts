import { endOfMonth, startOfMonth } from 'date-fns';
import nock from 'nock';
import { invariant } from 'ts-invariant';
import { parseRuntypeValidationError } from '../../../utils';
import { TripletexContact } from '../contact';

const baseUrl = process.env.BASE_URL || 'https://api.tripletex.io/';
const sessionToken = process.env.SESSION_TOKEN || 'a-session-token';

describe('activity class', () => {
  let client: TripletexContact;

  beforeEach(() => {
    client = new TripletexContact({ baseUrl }, sessionToken);
  });

  it('should list contacts', async () => {
    nock('https://api.tripletex.io:443', { encodedQueryParams: true })
      .get('/v2/contact')
      .reply(200, {
        fullResultSize: 1,
        from: 0,
        count: 1,
        versionDigest: 'Checksum not yet supported for this endpoint',
        values: [
          {
            "id" : 9004148,
            "version" : 1,
            "url" : "tripletex.no/v2/contact/88885",
            "firstName" : "Fastprisavtale",
            "lastName" : "",
            "displayName" : "Fastprisavtale",
            "email" : "",
            "phoneNumberMobileCountry" : {
              "id" : 161,
              "url" : "tripletex.no/v2/country/161"
            },
            "phoneNumberMobile" : "",
            "phoneNumberWork" : "",
            "customer" : null,
            "department" : {
              "id" : 88885,
              "url" : "tripletex.no/v2/department/88885"
            },
            "isInactive" : false
          }
        ],
      });
    const entries = await client.list();

    parseRuntypeValidationError(entries.error);
    invariant(entries.success);
    expect(entries.body.values).toMatchInlineSnapshot(`
Array [
  Object {
    "customer": Object {
      "id": 88885,
      "url": "api.tripletex.io/v2/customer/88885",
    },
    "department": Object {
      "id": 88885,
      "url": "api.tripletex.io/v2/department/88885",
    },
    "displayName": "Simen A. W. Olsen API Testuser",
    "email": "an@email.co.uk",
    "firstName": "Simen A. W. Olsen",
    "id": 1734852,
    "isInactive": false,
    "lastName": "API Testuser",
    "phoneNumberMobile": "",
    "phoneNumberMobileCountry": Object {
      "id": 161,
      "url": "api.tripletex.io/v2/country/161",
    },
    "phoneNumberWork": "",
    "url": "api.tripletex.io/v2/contact/1734852",
    "version": 1,
  },
]
`);
  });
});
