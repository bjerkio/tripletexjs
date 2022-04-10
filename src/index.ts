import { TripletexActivity } from './calls/activity/activity';
import { TripletexTimesheet } from './calls/timesheet/timesheet';
import { TripletexToken } from './calls/token/token';
import { TripletexClientConfig } from './types';
export * from './calls/token/token';

/**
 * Tripletex Client
 *
 * @example
 *
 */
export class TripletexClient {
  constructor(private readonly config: TripletexClientConfig) {}

  activity(): TripletexActivity {
    return new TripletexActivity(this.config);
  }

  timesheet(): TripletexTimesheet {
    return new TripletexTimesheet(this.config);
  }

  token(): TripletexToken {
    return new TripletexToken(this.config);
  }

  // bank(): TripletexBank {
  //   const bank = new TripletexBank();
  // }
}
