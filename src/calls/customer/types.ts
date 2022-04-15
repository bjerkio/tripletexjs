import { DefaultTripletexInputs } from '../../types';

export interface ListCustomersInput extends DefaultTripletexInputs {
  /**
   * List of IDs
   */
  id?: string[];

  /**
   * List of IDs
   */
  customerAccountNumber?: string[];

  /**
   * Equals
   */
  organizationNumber?: string;

  /**
   * Equals
   */
  email?: string;

  /**
   * Equals
   */
  invoiceEmail?: string;

  /**
   * Equals
   *
   * @default false
   */
  isInactive?: boolean;

  /**
   * List of IDs
   */
  accountManagerId?: string[];

  /**
   * Only return elements that have changed since this date and time
   */
  changedSince?: Date;
}
