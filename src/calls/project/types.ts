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

export interface CreateProjectSpecificRate {
  hourlyRate: number;
  hourlyCostPercentage?: number;
}

export interface CreateHourlyRateInput {
  startDate: Date;
  showInProjectOrder?: boolean;
  hourlyRateModel:
    | 'TYPE_PREDEFINED_HOURLY_RATES'
    | 'TYPE_PROJECT_SPECIFIC_HOURLY_RATES'
    | 'TYPE_FIXED_HOURLY_RATE';
  projectSpecificRates?: CreateProjectSpecificRate[];
  fixedRate?: number;
}

export interface CreateProjectParticipantInput {
  employeeId: number;
  adminAccess?: boolean;
}

export interface CreateProjectInput {
  /**
   * Max length 255
   */
  name: string;

  /**
   * Max length 100
   */
  number?: string;

  description?: string;

  /**
   * Employee id for the project manager
   */
  projectManagerId: number;

  departmentId?: number;

  mainProjectId?: number;

  startDate: Date;
  endDate?: Date;

  customerId?: number;

  isClosed?: boolean;
  isReadyForInvocing?: boolean;
  isInternal?: boolean;

  /**
   * Project is fixed price if set to true,
   * hourly rate if set to false.
   */
  isFixedPrice?: boolean;

  projectCategoryId?: number;

  // TOOD: Add delivery address setup
  // deliveryAddressId?: number;

  displayNameFormat?:
    | 'NAME_STANDARD'
    | 'NAME_INCL_CUSTOMER_NAME'
    | 'NAME_INCL_PARENT_NAME'
    | 'NAME_INCL_PARENT_NUMBER'
    | 'NAME_INCL_PARENT_NAME_AND_NUMBER';

  reference?: string;
  externalAccountsNumber?: string;

  /**
   * Fixed price amount, in the project's currency.
   */
  fixedprice?: number;

  markUpOrderLines?: number;
  markUpFeesEarned?: number;

  isPriceCeiling?: boolean;
  priceCeilingAmount?: number;

  // TODO: Add project hourly rates, needs serializer
  // projectHourlyRates?: CreateHourlyRateInput[];

  forParticipantsOnly?: boolean;
  // TODO: Add participants, needs serializer
  // participants: CreateProjectParticipantInput[];
  invoiceComment?: string;

  // invoicingPlan
  generalProjectActivitiesPerProjectOnly?: boolean;

  // projectActivities
  // invoiceDueDate?: Date;
  invoiceReceiverEmail?: string;
  /**
   * READ/WRITE access on project
   */
  accessType?: string;

  useProductNetPrice?: boolean;
  ignoreCompanyProductDiscountAgreement?: boolean;
}
