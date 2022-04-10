import { buildCall, CallReturn, TypicalHttpError } from 'typical-fetch';
import { invariant } from 'ts-invariant';
import { TripletexClientConfig, TripletexRuntimeConfig } from '../types';

export abstract class TripletexBase {
  constructor(
    readonly config: TripletexClientConfig,
    readonly runtimeConfig?: TripletexRuntimeConfig,
  ) {}

  protected authenticatedCall() {
    invariant(this.runtimeConfig, 'missing runtime config');
    invariant(this.config.baseUrl, 'missing baseUrl in config');
    const basicAuth = Buffer.from(
      [
        this.runtimeConfig?.organizationId ?? '0', //
        this.runtimeConfig.sessionToken,
      ].join(':'),
    ).toString('base64');

    return buildCall() //
      .baseUrl(this.config.baseUrl)
      .headers(() => ({
        'User-Agent': this.config.userAgent ?? 'bjerkio-tripletex/3',
        Authorization: `Basic ${basicAuth}`,
      }));
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
    call: () => Promise<CallReturn<R, E>>,
  ): Promise<CallReturn<R, E>> {
    for (let n = 0; n <= 3; n++) {
      const res = await call();

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

  // private refreshToken():
  //   | ReturnType<typeof authCalls.getToken>
  //   | ReturnType<typeof authCalls.refreshTokens>
  //   | undefined {
  //   if (this.tokenState === undefined) {
  //     invariant(this.clientKey);
  //     return authCalls.getToken({
  //       applicationKey: this.applicationKey,
  //       baseUrl: this.baseUrl,
  //       clientKey: this.clientKey,
  //     });
  //   } else if (this.tokenHasExpired()) {
  //     return authCalls.refreshTokens({
  //       baseUrl: this.baseUrl,
  //       refreshToken: this.tokenState.refreshToken,
  //     });
  //   } else {
  //     // we have a token and it's valid!
  //     return undefined;
  //   }
  // }
}
