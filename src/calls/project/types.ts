import { DefaultTripletexInputs } from '../../types';

export interface ListProjectsInput extends DefaultTripletexInputs {
  /**
   * List of IDs
   */
  id?: string[];

  /**
   * Containing
   */
  name?: string;

  /**
   * Equals
   */
  number?: string;

  isOffer?: boolean;

  /**
   * List of IDs
   */
  projectManagerId?: string[];

  /**
   * List of IDs
   */
  employeeInProjectId?: string[];

  /**
   * List of IDs
   */
  departmentId?: string[];

  startDateFrom?: Date;
  startDateTo?: Date;

  endDateFrom?: Date;
  endDateTo?: Date;

  isClosed?: boolean;

  /**
   * Equals
   */
  customerId?: string;

  /**
   * Containing
   */
  externalAccountsNumber?: string;
}
