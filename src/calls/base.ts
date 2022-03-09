import { buildCall, CallReturn, TypicalHttpError } from 'typical-fetch';

export class TripletexBase {
  protected buildCall() {
    return buildCall();
  }

  protected async performRequest<R, E = Error>(
    call: () => Promise<CallReturn<R, E>>,
  ): Promise<CallReturn<R, E>> {
    let err: E = new Error('Unknown error');
     
    for (let n = 0; n <= 3; n++) {
      const res = await call();

      if (res.success) {
        return res;
      }

      const { error } = res;
      err = error;
      if (error instanceof TypicalHttpError && error.status === 429) {
        const resetHeader = error.res.headers?.get('X-Rate-Limit-Reset');
        const secondsToRetry = resetHeader ? Number(resetHeader) : 2;
        const millis = secondsToRetry * 1000 + 100;
        await new Promise(resolve => setTimeout(resolve, millis));
      } else {
        return res;
      }
    }

    return {
      success: false,
      error: err,
      body: undefined,
    };
  }
}
