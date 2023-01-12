import { DefaultTripletexInputs } from '../../types';
import { serializeQuery, withRuntype } from '../../utils';
import { TripletexBase } from '../base';
import { listEmployeesResponseRt } from './models/employee';
export * from './models/employee';

export interface ListEmployeesInput extends DefaultTripletexInputs {
  /**
   * List of IDs
   */
  id?: string[];

  /**
   * Containing
   */
  firstName?: string;

  /**
   * Containing
   */
  lastName?: string;

  /**
   * Containing
   */
  email?: string;

  /**
   * Containing
   */
  employeeNumber?: string;

  allowInformationRegistration?: boolean;
  includeContacts?: boolean;

  /**
   * List of IDs
   */
  deploymentId?: string[];

  onlyProjectManagers?: boolean;
  onlyContacts?: boolean;
  assignableProjectManagers?: boolean;

  /**
   * Equals
   */
  periodStart?: Date;

  /**
   * Equals
   */
  periodEnd?: Date;

  hasSystemAccess?: boolean;
}

export class TripletexEmployee extends TripletexBase {
  list(input?: ListEmployeesInput) {
    const call = this.authenticatedCall() //
      .args<{
        input?: ListEmployeesInput;
      }>()
      .path('/v2/employee')
      .query(args => (args.input ? serializeQuery(args.input) : {}))
      .method('get')
      .parseJson(withRuntype(listEmployeesResponseRt))
      .build();

    return this.performRequest(sessionToken => call({ input, sessionToken }));
  }
}
