import { buildCall, CallReturn, TypicalHttpError } from 'typical-fetch';
import { invariant } from 'ts-invariant';
import { TripletexClientConfig, TripletexRuntimeConfig } from '../types';
import { TripletexToken } from './token/token';
import { addDays } from 'date-fns';

export abstract class TripletexBase {
  private readonly tokenClient: TripletexToken;

  constructor(
    readonly config: TripletexClientConfig,
    private sessionToken?: string,
  ) {
    this.tokenClient = new TripletexToken(config);
  }

  protected authenticatedCall() {
    invariant(this.config.baseUrl, 'missing baseUrl in config');
    return buildCall() //
      .args<{ sessionToken: string }>()
      .baseUrl(this.config.baseUrl)
      .headers(({ sessionToken }) => {
        const basicAuth = Buffer.from(
          [
            this.config.organizationId ?? '0', //
            sessionToken,
          ].join(':'),
        ).toString('base64');

        return {
          'User-Agent': this.config.userAgent ?? 'bjerkio-tripletex/3',
          Authorization: `Basic ${basicAuth}`,
        };
      });
    // .mapError(errorParser);
  }

  protected unauthenticatedCall() {
    invariant(this.config.baseUrl, 'missing baseUrl in config');
    return buildCall() //
      .baseUrl(this.config.baseUrl)
      .headers(() => ({
        'User-Agent': this.config.userAgent ?? 'bjerkio-tripletex/3',
      }));
    // .mapError(errorParser);
  }

  protected async performRequest<R, E>(
    call: (sessionToken: string) => Promise<CallReturn<R, E>>,
  ): Promise<CallReturn<R, E>> {
    const sessionToken = await this.getToken();

    for (let n = 0; n <= 3; n++) {
      const res = await call(sessionToken);

      if (res.success) {
        return res;
      }

      const { error } = res;
      if (error instanceof TypicalHttpError && error.status === 429) {
        const resetHeader = error.res.headers?.get('X-Rate-Limit-Reset');
        const secondsToRetry = resetHeader ? Number(resetHeader) : 2;
        const millis = secondsToRetry * 1000 + 100;
        await new Promise(resolve => setTimeout(resolve, millis));
      } else {
        return res;
      }
    }

    throw new Error('Not able to perform request');
  }

  private async getToken() {
    if (this.sessionToken) {
      return this.sessionToken;
    }

    const expirationDate = this.config.expirationDate ?? addDays(new Date(), 2);
    invariant(this.config.employeeToken, 'expected employeeToken in config');
    invariant(this.config.consumerToken, 'expected consumerToken in config');

    const tokenRequest = await this.tokenClient.createSessionToken({
      employeeToken: this.config.employeeToken,
      consumerToken: this.config.consumerToken,
      expirationDate,
    });

    if (!tokenRequest.success) {
      throw new Error('Not able to retrieve session token');
    }

    this.sessionToken = tokenRequest.body.value.token;
    return this.sessionToken;
  }
}
