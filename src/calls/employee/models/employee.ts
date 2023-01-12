import * as rt from 'runtypes';
import { multipleValuesEnvelope } from '../../../utils';

export const employeeRt = rt.Record({
  id: rt.Number,
  version: rt.Number.nullable().optional(),
  firstName: rt.String,
  lastName: rt.String,
  displayName: rt.String.nullable().optional(),
  employeeNumber: rt.String.nullable().optional(),
  dateOfBirth: rt.String.nullable().optional(),
  email: rt.String.nullable().optional(),
  phoneNumberMobileCountry: rt
    .Record({
      id: rt.Number,
    })
    .nullable()
    .optional(),
  phoneNumberMobile: rt.String.nullable().optional(),
  phoneNumberHome: rt.String.nullable().optional(),
  phoneNumberWork: rt.String.nullable().optional(),
  nationalIdentityNumber: rt.String.nullable().optional(),
  dnumber: rt.String.nullable().optional(),
  internationalId: rt.Record({
    // TODO: Add country
    number: rt.String.optional(),
    intAmeldingType: rt
      .Union(
        rt.Literal('PASSPORT_NO'),
        rt.Literal('NATIONAL_INSURANCE_NO'),
        rt.Literal('TAX_IDENTIFICATION_NO'),
        rt.Literal('VALUE_ADDED_TAX_IDENTIFICATION_NO'),
      )
      .nullable()
      .optional(),
  }),
  bankAccountNumber: rt.String.nullable().optional(),
  iban: rt.String.nullable().optional(),
  bic: rt.String.nullable().optional(),
  creditorBankCountryId: rt.Number.nullable().optional(),
  usesAbroadPayment: rt.Boolean.nullable().optional(),
  userType: rt
    .Union(
      rt.Literal('STANDARD'),
      rt.Literal('EXTENDED'),
      rt.Literal('NO_ACCESS'),
    )
    .nullable()
    .optional(),
  comments: rt.String.nullable().optional(),
  // address: addressRt,
  // department: departmentRt,
  employments: rt
    .Array(
      rt.Record({
        id: rt.Number,
      }),
    )
    .nullable()
    .optional(),
  holidayAllowanceEarned: rt
    .Record({
      amount: rt.Number,
      amountExtraHolidayWeek: rt.Number,
      basis: rt.Number,
      year: rt.Number,
    })
    .nullable()
    .optional(),
  // employeeCategory: employeeCategoryRt,
});

export type Employee = rt.Static<typeof employeeRt>;

export const listEmployeesResponseRt = multipleValuesEnvelope(employeeRt);
