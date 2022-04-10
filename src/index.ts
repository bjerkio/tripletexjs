import { TripletexActivity } from './calls/activity/activity';
import { TripletexEmployee } from './calls/employee/employee';
import { TripletexTimesheet } from './calls/timesheet/timesheet';
import { TripletexToken } from './calls/token/token';
import { TripletexClientConfig } from './types';
export * from './calls/activity/activity';
export * from './calls/employee/employee';
export * from './calls/timesheet/timesheet';
export * from './calls/token/token';

/**
 * Tripletex Client
 *
 */
export class TripletexClient {
  constructor(private readonly config: TripletexClientConfig) {}

  activity(): TripletexActivity {
    return new TripletexActivity(this.config);
  }

  employee(): TripletexEmployee {
    return new TripletexEmployee(this.config);
  }

  timesheet(): TripletexTimesheet {
    return new TripletexTimesheet(this.config);
  }

  token(): TripletexToken {
    return new TripletexToken(this.config);
  }
}
