import { DefaultTripletexInputs } from "../../types";
import { serializeQuery, withRuntype } from "../../utils";
import { TripletexBase } from "../base";
import { listContactsResponseRt } from "./models/contact";

export interface ListContactsInput extends DefaultTripletexInputs {
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
  email?: string;

  /**
   * List of IDs
   */
  customerId?: string;

  /**
   * List of IDs
   */
  departmentId?: string;

  /**
   * From index
   */
  includeContacts?: boolean;

  /**
   * List of IDs
   */
  deploymentId?: string[];
 
  /**
   * Number of elements to return
   */
  count: number;

  /**
   * Sorting pattern
   */
  sorting: string;

  /**
   * Fields filter pattern
   */
  fields: string;
}

export class TripletexContact extends TripletexBase {
  list(input?: ListContactsInput) {
    const call = this.authenticatedCall() //
      .args<{
        input?: ListContactsInput;
      }>()
      .path('/v2/contact')
      .query(args => (args.input ? serializeQuery(args.input) : {}))
      .method('get')
      .parseJson(withRuntype(listContactsResponseRt))
      .build();

    return this.performRequest(sessionToken => call({ input, sessionToken }));
  }
}