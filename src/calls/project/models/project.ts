import * as rt from 'runtypes';
import { multipleValuesEnvelope, resourceRef, singleValueEnvelope } from '../../../utils';

const projectRt = rt.Record({
  id: rt.Number,
  version: rt.Number.nullable().optional(),
  name: rt.String,
  displayName: rt.String,
  number: rt.String.nullable().optional(),
  description: rt.String.nullable().optional(),
  projectManager: rt.Record({
    id: rt.Number,
  }),
  department: rt
    .Record({
      id: rt.Number,
    })
    .nullable()
    .optional(),
  mainProject: rt
    .Record({
      id: rt.Number,
    })
    .nullable()
    .optional(),
  startDate: rt.String,
  endDate: rt.String.nullable().optional(),
  customer: resourceRef,
  isClosed: rt.Boolean,
  isReadyForInvoicing: rt.Boolean,
  isInternal: rt.Boolean,
  isFixedPrice: rt.Boolean,
  projectCategory: resourceRef,
  deliveryAddress: resourceRef,
  displayNameFormat: rt.Union(
    rt.Literal('NAME_STANDARD'),
    rt.Literal('NAME_INCL_CUSTOMER_NAME'),
    rt.Literal('NAME_INCL_PARENT_NAME'),
    rt.Literal('NAME_INCL_PARENT_NUMBER'),
    rt.Literal('NAME_INCL_PARENT_NAME_AND_NUMBER'),
  ),
  reference: rt.String.nullable().optional(),
  externalAccountsNumber: rt.String.nullable().optional(),
  vatType: resourceRef,
  fixedprice: rt.Number,
  currency: resourceRef,
  markUpOrderLines: rt.Number,
  markUpFeesEarned: rt.Number,
  isPriceCeiling: rt.Boolean,
  priceCeilingAmount: rt.Number,
  projectHourlyRates: rt.Array(resourceRef),
  forParticipantsOnly: rt.Boolean,
  participants: rt.Array(resourceRef),
  contact: resourceRef,
  attention: resourceRef,
  invoiceComment: rt.String,
  generalProjectActivitiesPerProjectOnly: rt.Boolean,
  projectActivities: rt
    .Array(
      rt.Record({
        id: rt.Number,
      }),
    )
    .nullable()
    .optional(),
});

export type Project = rt.Static<typeof projectRt>;

export const listProjectResponseRt = multipleValuesEnvelope(projectRt);
export const createProjectResponseRt = singleValueEnvelope(projectRt);
