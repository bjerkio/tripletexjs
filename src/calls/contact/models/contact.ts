import * as rt from 'runtypes';
import { multipleValuesEnvelope } from '../../../utils';

const contactRt = rt.Record({
  id: rt.Number,
  version: rt.Number.nullable().optional(),
  url: rt.String,
  firstName: rt.String,
  lastName: rt.String,
  displayName: rt.String.nullable().optional(),
  email: rt.String.nullable().optional(),
  phoneNumberMobileCountry: rt
  .Record({
    id: rt.Number,
  })
  .nullable()
  .optional(),
  phoneNumberMobile: rt.String.nullable().optional(),
  phoneNumberWork: rt.String.nullable().optional(),
  customer: rt.Record({
    id: rt.Number,
    url: rt.String,
  }).nullable(),
  department: rt.Record({
    id: rt.Number,
    url: rt.String,
  }).nullable(),
  isInactive: rt.Boolean.nullable().optional(),
})

export type Contact = rt.Static<typeof contactRt>;


export const listContactsResponseRt = multipleValuesEnvelope(contactRt);