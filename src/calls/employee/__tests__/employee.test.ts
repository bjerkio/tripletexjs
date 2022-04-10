import { endOfMonth, startOfMonth } from 'date-fns';
import nock from 'nock';
import { invariant } from 'ts-invariant';
import { parseRuntypeValidationError } from '../../../utils';
import { TripletexEmployee } from '../employee';

const baseUrl = process.env.BASE_URL || 'https://api.tripletex.io/';
const sessionToken = process.env.SESSION_TOKEN || 'a-session-token';

describe('activity class', () => {
  let client: TripletexEmployee;

  beforeEach(() => {
    client = new TripletexEmployee({ baseUrl }, sessionToken);
  });

  it('should list employees', async () => {
    nock('https://api.tripletex.io:443', { encodedQueryParams: true })
      .get('/v2/employee')
      .reply(200, {
        fullResultSize: 1,
        from: 0,
        count: 1,
        versionDigest: 'Checksum not yet supported for this endpoint',
        values: [
          {
            id: 1734852,
            version: 1,
            url: 'api.tripletex.io/v2/employee/1734852',
            firstName: 'Simen A. W. Olsen',
            lastName: 'API Testuser',
            displayName: 'Simen A. W. Olsen API Testuser',
            employeeNumber: '',
            dateOfBirth: null,
            email: 'an@email.co.uk',
            phoneNumberMobileCountry: {
              id: 161,
              url: 'api.tripletex.io/v2/country/161',
            },
            phoneNumberMobile: '',
            phoneNumberHome: '',
            phoneNumberWork: '',
            nationalIdentityNumber: '',
            dnumber: '',
            internationalId: {
              intAmeldingType: null,
              country: null,
              number: '',
            },
            bankAccountNumber: '',
            iban: '',
            bic: '',
            creditorBankCountryId: 0,
            usesAbroadPayment: false,
            allowInformationRegistration: true,
            isContact: false,
            comments: '',
            address: null,
            department: {
              id: 88885,
              url: 'api.tripletex.io/v2/department/88885',
            },
            employments: [
              {
                id: 12866,
                url: 'api.tripletex.io/v2/employee/employment/12866',
              },
            ],
            holidayAllowanceEarned: {
              year: 0,
              amount: 0,
              basis: 0,
              amountExtraHolidayWeek: 0,
            },
            employeeCategory: null,
            isAuthProjectOverviewURL: true,
            pictureId: 0,
          },
        ],
      });
    const entries = await client.list();

    parseRuntypeValidationError(entries.error);
    invariant(entries.success);
    expect(entries.body.values).toMatchInlineSnapshot(`
Array [
  Object {
    "address": null,
    "allowInformationRegistration": true,
    "bankAccountNumber": "",
    "bic": "",
    "comments": "",
    "creditorBankCountryId": 0,
    "dateOfBirth": null,
    "department": Object {
      "id": 88885,
      "url": "api.tripletex.io/v2/department/88885",
    },
    "displayName": "Simen A. W. Olsen API Testuser",
    "dnumber": "",
    "email": "an@email.co.uk",
    "employeeCategory": null,
    "employeeNumber": "",
    "employments": Array [
      Object {
        "id": 12866,
        "url": "api.tripletex.io/v2/employee/employment/12866",
      },
    ],
    "firstName": "Simen A. W. Olsen",
    "holidayAllowanceEarned": Object {
      "amount": 0,
      "amountExtraHolidayWeek": 0,
      "basis": 0,
      "year": 0,
    },
    "iban": "",
    "id": 1734852,
    "internationalId": Object {
      "country": null,
      "intAmeldingType": null,
      "number": "",
    },
    "isAuthProjectOverviewURL": true,
    "isContact": false,
    "lastName": "API Testuser",
    "nationalIdentityNumber": "",
    "phoneNumberHome": "",
    "phoneNumberMobile": "",
    "phoneNumberMobileCountry": Object {
      "id": 161,
      "url": "api.tripletex.io/v2/country/161",
    },
    "phoneNumberWork": "",
    "pictureId": 0,
    "url": "api.tripletex.io/v2/employee/1734852",
    "usesAbroadPayment": false,
    "version": 1,
  },
]
`);
  });
});
