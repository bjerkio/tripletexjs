import { TripletexActivity } from './calls/activity/activity';
import { TripletexContact } from './calls/contact/contact';
import { TripletexCustomer } from './calls/customer/customer';
import { TripletexEmployee } from './calls/employee/employee';
import { TripletexEvent } from './calls/event/event';
import { TripletexOrder } from './calls/order/order';
import { TripletexProject } from './calls/project/project';
import { TripletexTimesheet } from './calls/timesheet/timesheet';
import { TripletexToken } from './calls/token/token';
import { TripletexClientConfig } from './types';
export * from './calls/activity/activity';
export * from './calls/customer/customer';
export * from './calls/employee/employee';
export * from './calls/event/event';
// export * from './calls/ledger-account/ledger-account';
export * from './calls/order/order';
export * from './calls/project/project';
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

  contact(): TripletexContact {
    return new TripletexContact(this.config);
  }

  customer(): TripletexCustomer {
    return new TripletexCustomer(this.config);
  }

  employee(): TripletexEmployee {
    return new TripletexEmployee(this.config);
  }

  event(): TripletexEvent {
    return new TripletexEvent(this.config);
  }

  order(): TripletexOrder {
    return new TripletexOrder(this.config);
  }

  project(): TripletexProject {
    return new TripletexProject(this.config);
  }

  timesheet(): TripletexTimesheet {
    return new TripletexTimesheet(this.config);
  }

  token(): TripletexToken {
    return new TripletexToken(this.config);
  }
}
