export interface TripletexClientConfig {
  /**
   * Base URL
   *
   * @default https://tripletex.no
   */
  baseUrl?: string;

  /**
   * @default tripletexjs/4
   */
  userAgent?: string;

  employeeToken?: string;

  consumerToken?: string;

  organizationId?: string;

  expirationDate?: Date;
}

export interface DefaultTripletexInputs {
  /**
   * From index
   */
  from?: number;

  /**
   * Number of elements to return
   * @default 1000
   */
  count?: number;
  sorting?: string;
}