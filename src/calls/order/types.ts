import { DefaultTripletexInputs } from '../../types';

export interface ListOrdersInput extends DefaultTripletexInputs {
  /**
   * List of IDs
   */
  id?: string[];
}

export interface CreateOrderLineInput {
  productId: number;
  orderId: number;
  inventoryId?: number;
  inventoryLocationId?: number;
  vatTypeId?: number;

  description?: string;
  count?: number;
  unitCostCurrency?: number;
  unitPriceExcludingVatCurrency?: number;
  markup?: number;
  discount?: number;
  unitPriceIncludingVatCurrency?: number;
  isSubscription?: boolean;
  subscriptionPeriodStart?: Date;
  subscriptionPeriodEnd?: Date;
  // orderGroup?: OrderGroup;
}

export interface CreateOrderInput {
  // TODO: Add attn
  // attn?: string;

  customerId: number;
  contactId?: number;
  ourContactId?: number;
  ourContactEmployeeId?: number;
  projectId?: number;
  departmentId?: number;
  currencyId?: number;
  deliveryAddressId?: number;

  receiverEmail?: string;

  overdueNoticeEmail?: string;

  number?: string;

  reference?: string;

  orderDate: Date;

  /**
   * Comment to be displayed in the invoice based on this order.
   * Can be also found in Invoice.invoiceComment on Invoice objects.
   */
  invoiceComment?: string;

  /**
   * Number of days/months in which invoices created from this order is due
   */
  invoicesDueIn?: number;

  /**
   * Set the time unit of invoicesDueIn. The special case RECURRING_DAY_OF_MONTH
   * enables the due date to be fixed to a specific day of the month,
   * in this case the fixed due date will automatically be set as standard
   * on all invoices created from this order.
   *
   * Note that when RECURRING_DAY_OF_MONTH is set, the due date will be set
   * to the last day of month if "31" is set in invoicesDueIn.
   */
  invoicesDueInType?: 'DAYS' | 'MONTHS' | 'RECURRING_DAY_OF_MONTH';

  /**
   * Show account statement - open posts on invoices created from this order
   */
  isShowOpenPostsOnInvoices?: boolean;

  /**
   * Denotes if this order is closed. A closed order can no longer
   * be invoiced unless it is opened again.
   */
  isClosed?: boolean;

  deliveryDate: Date;

  deliveryComment?: string;
  isPrioritizeAmountsIncludingVat?: boolean;
  orderLineSorting?: 'ID' | 'PRODUCT' | 'CUSTOM';

  /**
   * If true, the order is a subscription, which enables periodical
   * invoicing of order lines. First, create an order with isSubscription=true,
   * then approve it for subscription invoicing with the :approveSubscriptionInvoice method.
   */
  isSubscription?: boolean;

  /**
   * Number of months/years the subscription shall run
   */
  subscriptionDuration?: number;

  /**
   * The time unit of subscriptionDuration
   */
  subscriptionDurationType?: 'MONTHS' | 'YEAR';

  /**
   * Number of periods on each invoice
   */
  subscriptionPeriodsOnInvoice?: number;

  /**
   * Invoicing in advance/in arrears
   */
  subscriptionInvoicingTimeInAdvanceOrArrears?: 'ADVANCE' | 'ARREARS';

  /**
   * Number of days/months invoicing in advance/in arrears
   */
  subscriptionInvoicingTime?: number;

  /**
   * The time unit of subscriptionInvoicingTime
   */
  subscriptionInvoicingTimeType?: 'DAYS' | 'MONTHS';

  /**
   * Automatic invoicing. Starts when the subscription is approved
   */
  isSubscriptionAutoInvoicing?: boolean;
}
