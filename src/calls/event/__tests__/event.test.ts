import nock from 'nock';
import { invariant } from 'ts-invariant';
import { parseRuntypeValidationError } from '../../../utils';
import { TripletexEvent } from '../event';

const baseUrl = process.env.BASE_URL || 'https://api.tripletex.io/';
const sessionToken = process.env.SESSION_TOKEN || 'a-session-token';

describe('activity class', () => {
  let client: TripletexEvent;

  beforeEach(() => {
    client = new TripletexEvent({ baseUrl }, sessionToken);
  });

  it('should create a subscription', async () => {
    nock('https://api.tripletex.io:443', { encodedQueryParams: true })
      .post('/v2/event/subscription', {
        event: 'invoice.charged',
        targetUrl: 'http://example.com',
      })
      .reply(201, {
        value: {
          id: 48620,
          version: 0,
          url: 'api.tripletex.io/v2/event/subscription/48620',
          event: 'invoice.charged',
          targetUrl: 'http://example.com',
          fields: null,
          status: 'ACTIVE',
          authHeaderName: null,
        },
      });
    const subscription = await client.createSubscription({
      event: 'invoice.charged',
      targetUrl: 'http://example.com',
    });

    parseRuntypeValidationError(subscription.error);
    invariant(subscription.success);

    expect(subscription.body.value).toMatchSnapshot();
  });

  it('should get a subscription', async () => {
    nock('https://api.tripletex.io:443', { encodedQueryParams: true })
      .get('/v2/event/subscription/48620')
      .reply(200, {
        value: {
          id: 48620,
          version: 0,
          url: 'api.tripletex.io/v2/event/subscription/48620',
          event: 'invoice.charged',
          targetUrl: 'http://example.com',
          fields: null,
          status: 'ACTIVE',
          authHeaderName: null,
        },
      });
    const subscription = await client.getSubscription(48620);

    parseRuntypeValidationError(subscription.error);
    invariant(subscription.success);

    expect(subscription.body.value).toMatchSnapshot();
  });

  it('should delete a subscription', async () => {
    nock('https://api.tripletex.io:443', { encodedQueryParams: true })
      .delete('/v2/event/subscription/48619')
      .reply(204, '');
    const subscription = await client.deleteSubscription(48619);

    parseRuntypeValidationError(subscription.error);

    expect(subscription.success).toBeTruthy();
  });

  it('should list subscriptions', async () => {
    nock('https://api.tripletex.io:443', { encodedQueryParams: true })
      .get('/v2/event/subscription')
      .reply(200, {
        fullResultSize: 1,
        from: 0,
        count: 1,
        versionDigest: null,
        values: [
          {
            id: 48620,
            version: 0,
            url: 'api.tripletex.io/v2/event/subscription/48620',
            event: 'invoice.charged',
            targetUrl: 'http://example.com',
            fields: null,
            status: 'ACTIVE',
            authHeaderName: null,
          },
        ],
      });
    const subscription = await client.listSubscriptions();

    parseRuntypeValidationError(subscription.error);
    invariant(subscription.success);

    expect(subscription.body.values).toMatchSnapshot();
  });

  it('should create a subscription with fields', async () => {
    nock('https://api.tripletex.io:443', { encodedQueryParams: true })
      .post('/v2/event/subscription', {
        event: 'project.create',
        targetUrl: 'http://example.com',
        fields: 'id,name,number,isClosed',
      })
      .reply(201, {
        value: {
          id: 48638,
          version: 0,
          url: 'api.tripletex.io/v2/event/subscription/48638',
          event: 'project.create',
          targetUrl: 'http://example.com',
          fields: 'id,name,number,isClosed',
          status: 'ACTIVE',
          authHeaderName: null,
        },
      });
    const subscription = await client.createSubscription({
      event: 'project.create',
      targetUrl: 'http://example.com',
      fields: ['id', 'name', 'number', 'isClosed'],
    });

    parseRuntypeValidationError(subscription.error);
    invariant(subscription.success);

    expect(subscription.body.value).toMatchSnapshot();
  });
});
