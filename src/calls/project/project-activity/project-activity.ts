

import { serializeQuery, withRuntype } from "../../../utils";
import { TripletexBase } from "../../base";
import { listProjectActivityResponseRt } from "../models/project-activity";
import { ListProjectActivitiesInput } from "./types";

export class TripletexProjectActivity extends TripletexBase {

  // create call functions similar to those in project.ts
  list(input?: ListProjectActivitiesInput) {
   
    const call = this.authenticatedCall() //
      .args<{
        input?: ListProjectActivitiesInput;
      }>()
      .path('/v2/project')
      .query(args => (args.input ? serializeQuery(args.input) : {}))
      .method('get')
      .parseJson(withRuntype(listProjectActivityResponseRt))
      .build();

    return this.performRequest(sessionToken => call({ input, sessionToken }));
  
}