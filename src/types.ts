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

  expirationDate?: string;
}
