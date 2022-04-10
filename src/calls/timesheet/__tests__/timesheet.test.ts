import { endOfMonth, startOfMonth } from 'date-fns';
import nock from 'nock';
import { invariant } from 'ts-invariant';
import { formatDate, parseRuntypeValidationError } from '../../../utils';
import { TripletexTimesheet } from '../timesheet';

const baseUrl = process.env.BASE_URL || 'https://api.tripletex.io/';
const sessionToken = process.env.SESSION_TOKEN || 'a-session-token';

describe('activity class', () => {
  let client: TripletexTimesheet;

  beforeEach(() => {
    client = new TripletexTimesheet({ baseUrl }, sessionToken);
  });

  it('should list timesheet entries', async () => {
    const dateFrom = startOfMonth(new Date('2022-01-01'));
    const dateTo = endOfMonth(new Date('2022-01-01'));
    nock(baseUrl, { encodedQueryParams: true })
      .get('/v2/timesheet/entry')
      .query({ dateFrom: formatDate(dateFrom), dateTo: formatDate(dateTo) })
      .reply(200, {
        fullResultSize: 6,
        from: 0,
        count: 6,
        versionDigest: "'If-None-Match' header not specified",
        values: [
          {
            id: 1211627,
            version: 0,
            url: 'api.tripletex.io/v2/timesheet/entry/1211627',
            project: null,
            activity: {
              id: 45239,
              url: 'api.tripletex.io/v2/activity/45239',
            },
            date: '2022-01-01',
            hours: 4,
            chargeableHours: 0,
            employee: {
              id: 1734852,
              url: 'api.tripletex.io/v2/employee/1734852',
            },
            timeClocks: [],
            comment: '',
            locked: false,
            chargeable: false,
            invoice: null,
            hourlyRate: 0,
            hourlyCost: 0,
            hourlyCostPercentage: 0,
          },
          {
            id: 1211628,
            version: 0,
            url: 'api.tripletex.io/v2/timesheet/entry/1211628',
            project: null,
            activity: {
              id: 45239,
              url: 'api.tripletex.io/v2/activity/45239',
            },
            date: '2022-01-02',
            hours: 4,
            chargeableHours: 0,
            employee: {
              id: 1734852,
              url: 'api.tripletex.io/v2/employee/1734852',
            },
            timeClocks: [],
            comment: '',
            locked: false,
            chargeable: false,
            invoice: null,
            hourlyRate: 0,
            hourlyCost: 0,
            hourlyCostPercentage: 0,
          },
          {
            id: 1211629,
            version: 0,
            url: 'api.tripletex.io/v2/timesheet/entry/1211629',
            project: null,
            activity: {
              id: 45239,
              url: 'api.tripletex.io/v2/activity/45239',
            },
            date: '2022-01-04',
            hours: 7,
            chargeableHours: 0,
            employee: {
              id: 1734852,
              url: 'api.tripletex.io/v2/employee/1734852',
            },
            timeClocks: [],
            comment: '',
            locked: false,
            chargeable: false,
            invoice: null,
            hourlyRate: 0,
            hourlyCost: 0,
            hourlyCostPercentage: 0,
          },
          {
            id: 1211630,
            version: 0,
            url: 'api.tripletex.io/v2/timesheet/entry/1211630',
            project: null,
            activity: {
              id: 45239,
              url: 'api.tripletex.io/v2/activity/45239',
            },
            date: '2022-01-05',
            hours: 4,
            chargeableHours: 0,
            employee: {
              id: 1734852,
              url: 'api.tripletex.io/v2/employee/1734852',
            },
            timeClocks: [],
            comment: '',
            locked: false,
            chargeable: false,
            invoice: null,
            hourlyRate: 0,
            hourlyCost: 0,
            hourlyCostPercentage: 0,
          },
          {
            id: 1211631,
            version: 0,
            url: 'api.tripletex.io/v2/timesheet/entry/1211631',
            project: null,
            activity: {
              id: 45239,
              url: 'api.tripletex.io/v2/activity/45239',
            },
            date: '2022-01-06',
            hours: 2,
            chargeableHours: 0,
            employee: {
              id: 1734852,
              url: 'api.tripletex.io/v2/employee/1734852',
            },
            timeClocks: [],
            comment: '',
            locked: false,
            chargeable: false,
            invoice: null,
            hourlyRate: 0,
            hourlyCost: 0,
            hourlyCostPercentage: 0,
          },
          {
            id: 1211632,
            version: 0,
            url: 'api.tripletex.io/v2/timesheet/entry/1211632',
            project: null,
            activity: {
              id: 45240,
              url: 'api.tripletex.io/v2/activity/45240',
            },
            date: '2022-01-03',
            hours: 4,
            chargeableHours: 0,
            employee: {
              id: 1734852,
              url: 'api.tripletex.io/v2/employee/1734852',
            },
            timeClocks: [],
            comment: '',
            locked: false,
            chargeable: false,
            invoice: null,
            hourlyRate: 0,
            hourlyCost: 0,
            hourlyCostPercentage: 0,
          },
        ],
        sumAllHours: 25,
      });
    const entries = await client.listEntries({
      dateFrom,
      dateTo,
    });

    parseRuntypeValidationError(entries.error);
    invariant(entries.success);
    expect(entries.body.values).toMatchSnapshot();
  });

  it('should update timesheet entries', async () => {
    nock(baseUrl, { encodedQueryParams: true })
      .put('/v2/timesheet/entry/list', [
        {
          id: 1211634,
          employee: { id: 1734852 },
          activity: { id: 45239 },
          date: '2022-01-31',
          hours: 15,
          comment: 'This is from bjerkio/tripletexjs',
        },
      ])
      .reply(200, {
        fullResultSize: 0,
        from: 0,
        count: 1,
        versionDigest: null,
        values: [
          {
            id: 1211634,
            version: 1,
            url: 'api.tripletex.io/v2/timesheet/entry/1211634',
            project: null,
            activity: {
              id: 45239,
              url: 'api.tripletex.io/v2/activity/45239',
            },
            date: '2022-01-31',
            hours: 15,
            chargeableHours: 0,
            employee: {
              id: 1734852,
              url: 'api.tripletex.io/v2/employee/1734852',
            },
            timeClocks: [],
            comment: 'This is from bjerkio/tripletexjs',
            locked: false,
            chargeable: false,
            invoice: null,
            hourlyRate: 0,
            hourlyCost: 0,
            hourlyCostPercentage: 0,
          },
        ],
      });
    const result = await client.updateEntries([
      {
        id: 1211634,
        employeeId: 1734852,
        activityId: 45239,
        date: new Date('2022-01-31'),
        hours: 15,
        comment: 'This is from bjerkio/tripletexjs',
      },
    ]);
    parseRuntypeValidationError(result.error);
    invariant(result.success);
    expect(result).toMatchSnapshot();
  });

  it('should add timesheet entries', async () => {
    nock(baseUrl, { encodedQueryParams: true })
      .post('/v2/timesheet/entry/list', [
        {
          employee: { id: 1734852 },
          activity: { id: 45239 },
          date: '2022-01-31',
          hours: 20,
          comment: 'This is from bjerkio/tripletexjs',
        },
      ])
      .reply(201, {
        fullResultSize: 0,
        from: 0,
        count: 1,
        versionDigest: null,
        values: [
          {
            id: 1211634,
            version: 0,
            url: 'api.tripletex.io/v2/timesheet/entry/1211634',
            project: null,
            activity: {
              id: 45239,
              url: 'api.tripletex.io/v2/activity/45239',
            },
            date: '2022-01-31',
            hours: 20,
            chargeableHours: 0,
            employee: {
              id: 1734852,
              url: 'api.tripletex.io/v2/employee/1734852',
            },
            timeClocks: [],
            comment: 'This is from bjerkio/tripletexjs',
            locked: false,
            chargeable: false,
            invoice: null,
            hourlyRate: 0,
            hourlyCost: 0,
            hourlyCostPercentage: 0,
          },
        ],
      });
    const result = await client.addEntries([
      {
        employeeId: 1734852,
        activityId: 45239,
        date: new Date('2022-01-31'),
        hours: 20,
        comment: 'This is from bjerkio/tripletexjs',
      },
    ]);
    parseRuntypeValidationError(result.error);
    invariant(result.success);
    expect(result).toMatchSnapshot();
  });
});
