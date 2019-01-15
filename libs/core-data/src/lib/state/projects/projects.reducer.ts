import { Project } from './../../projects/project.model';
import { ProjectsActionTypes } from "./projects.actions";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Project One',
    details: 'This is a sample project',
    percentComplete: 20,
    approved: false,
    customerId: null
  },
  {
    id: '2',
    title: 'Project Two',
    details: 'This is a sample project',
    percentComplete: 40,
    approved: false,
    customerId: null
  },
  {
    id: '3',
    title: 'Project Three',
    details: 'This is a sample project',
    percentComplete: 100,
    approved: true,
    customerId: null
  }
];

const createProject = (projects, project) => [...projects, project];
const updateProject = (projects, project) => projects.map(p => {
  return p.id === project.id ? Object.assign({}, project) : p;
});
const deleteProject = (projects, project) => projects.filter(w => project.id !== w.id);

//01 Define the shape of my state 
export interface ProjectsState extends EntityState<Project> {
  selectedProjectId: string | null;
}

//02 Create entity adapter
export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>();

//03 Define the initial state
export const initialState: ProjectsState = adapter.getInitialState({
  selectedProjectId: null
})


//03 Build the most simplest reducer
//Every operation should inmutable
export function projectsReducers(
  state = initialState, action): ProjectsState {
  switch(action.type) {
    case ProjectsActionTypes.ProjectSelected:
      return Object.assign({}, state, { selectedProjectId: action.payload });

    case ProjectsActionTypes.ProjectsLoaded:
      console.log('PAYLOAD', action.payload)
      return adapter.addAll(action.payload, state);

    case ProjectsActionTypes.ProjectAdded: 
     //delegate to a stand alone function 
     //Because it is Testable!
     return adapter.addOne(action.payload, state);

    case ProjectsActionTypes.UpdateProject: 
      return adapter.updateOne(action.payload, state);
  
    case ProjectsActionTypes.DeleteProject:
      return adapter.removeOne(action.payload, state);

    default: 
      return state;
  }
}

//Selectors are just functions  
export const getSelectedProjectId = (state: ProjectsState) => state.selectedProjectId;

const { selectIds, selectEntities, selectAll } = adapter.getSelectors();

export const selectProjectIds = selectIds;
export const selectProjectEntities = selectEntities;
export const selectAllProjects = selectAll;