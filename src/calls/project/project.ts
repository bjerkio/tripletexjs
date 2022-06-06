import omitEmpty from 'omit-empty';
import { serializeQuery, toString, withRuntype } from '../../utils';
import { TripletexBase } from '../base';
import {
  createProjectResponseRt,
  listProjectResponseRt,
} from './models/project';
import {
  CreateProjectInput,
  ListProjectsInput,
  UpdateProjectInput,
} from './types';
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

  create(input: CreateProjectInput) {
    const call = this.authenticatedCall() //
      .args<{
        input: CreateProjectInput;
      }>()
      .path('/v2/project')
      .body(({ input }) => {
        const {
          projectManagerId,
          departmentId,
          mainProjectId,
          customerId,
          projectCategoryId,
          ...project
        } = input;

        return omitEmpty({
          ...project,
          startDate: project.startDate && toString(project.startDate),
          endDate: project.endDate && toString(project.endDate),
          projectManager: projectManagerId && {
            id: projectManagerId,
          },
          department: departmentId && {
            id: departmentId,
          },
          mainProject: mainProjectId && {
            id: mainProjectId,
          },
          customer: customerId && {
            id: customerId,
          },
          projectCategory: projectCategoryId && {
            id: projectCategoryId,
          },
        }) as any;
      })
      .method('post')
      .parseJson(withRuntype(createProjectResponseRt))
      .build();

    return this.performRequest(sessionToken => call({ input, sessionToken }));
  }

  update(id: number, input: UpdateProjectInput) {
    const call = this.authenticatedCall() //
      .args<{
        id: number;
        input: UpdateProjectInput;
      }>()
      .path(({ id }) => `/v2/project/${id}`)
      .body(({ input }) => {
        const {
          projectManagerId,
          departmentId,
          mainProjectId,
          customerId,
          projectCategoryId,
          ...project
        } = input;

        return omitEmpty({
          ...project,
          startDate: project.startDate && toString(project.startDate),
          endDate: project.endDate && toString(project.endDate),
          projectManager: projectManagerId && {
            id: projectManagerId,
          },
          department: departmentId && {
            id: departmentId,
          },
          mainProject: mainProjectId && {
            id: mainProjectId,
          },
          customer: customerId && {
            id: customerId,
          },
          projectCategory: projectCategoryId && {
            id: projectCategoryId,
          },
        }) as any;
      })
      .method('put')
      .parseJson(withRuntype(createProjectResponseRt))
      .build();

    return this.performRequest(sessionToken =>
      call({ id, input, sessionToken }),
    );
  }
}
