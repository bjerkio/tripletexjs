import { addDays } from 'date-fns';
import * as dotenv from 'dotenv';
import nock from 'nock';
import { invariant } from 'ts-invariant';
import { formatDate } from '../../../utils';
import { TripletexToken } from '../token';

dotenv.config();

const baseUrl = process.env.BASE_URL || 'https://api.tripletex.io/';

describe('token class', () => {
  let tokenClass: TripletexToken;

  beforeEach(() => {
    tokenClass = new TripletexToken({ baseUrl });
  });

  it('should create session token', async () => {
    const expirationDate = addDays(new Date(), 2);
    nock(baseUrl, { encodedQueryParams: true })
      .put('/v2/token/session/:create')
      .query({
        employeeToken: String(process.env.EMPLOYEE_TOKEN),
        consumerToken: String(process.env.CONSUMER_TOKEN),
        expirationDate: formatDate(expirationDate),
      })
      .reply(200, {
        value: {
          id: 19015016,
          version: 1,
          url: 'api.tripletex.io/v2/token/session/19015016',
          consumerToken: {
            id: 1754,
            url: 'api.tripletex.io/v2/token/consumer/1754',
          },
          employeeToken: {
            id: 2913,
            url: 'api.tripletex.io/v2/token/employee/2913',
          },
          expirationDate: '2022-04-12',
          token:
            'eyJ0b2tlbklkIjoxOTAxNTAxNiwidG9rZW4iOiJ0ZXN0LWIzMjU0NTg5LTU1OTctNDY0Mi04MmU5LTUyNDkyOWZlZGViNSJ9',
          encryptionKey: null,
        },
      });

    const token = await tokenClass.createSessionToken({
      employeeToken: String(process.env.EMPLOYEE_TOKEN),
      consumerToken: String(process.env.CONSUMER_TOKEN),
      expirationDate,
    });

    invariant(token.success);

    expect(token.body.value.token).toEqual(
      'eyJ0b2tlbklkIjoxOTAxNTAxNiwidG9rZW4iOiJ0ZXN0LWIzMjU0NTg5LTU1OTctNDY0Mi04MmU5LTUyNDkyOWZlZGViNSJ9',
    );
  });
});
