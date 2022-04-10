import { serializeQuery, withRuntype } from '../../utils';
import { listEmployeesResponseRt } from './models/employee';
import { TripletexBase } from '../base';
import { DefaultTripletexInputs } from '../../types';
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
  employeeNumber?: string;

  allowInformationRegistration?: Boolean;
  includeContacts?: Boolean;

  /**
   * List of IDs
   */
  deploymentId?: string[];

  onlyProjectManagers?: Boolean;
  onlyContacts?: Boolean;
  assignableProjectManagers?: Boolean;

  /**
   * Equals
   */
  periodStart?: Date;

  /**
   * Equals
   */
  periodEnd?: Date;

  hasSystemAccess?: Boolean;
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
