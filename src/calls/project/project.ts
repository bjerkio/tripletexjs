import { serializeQuery, withRuntype } from '../../utils';
import { TripletexBase } from '../base';
import { listProjectResponseRt } from './models/project';
import { ListProjectsInput } from './types';
export * from './models/project';


export class TripletexProject extends TripletexBase {
  list(input?: ListProjectsInput) {
    const call = this.authenticatedCall() //
      .args<{
        input?: ListProjectsInput;
      }>()
      .path('/v2/project')
      .query(args => (args.input ? serializeQuery(args.input) : {}))
      .method('get')
      .parseJson(withRuntype(listProjectResponseRt))
      .build();

    return this.performRequest(sessionToken => call({ input, sessionToken }));
  }
}
