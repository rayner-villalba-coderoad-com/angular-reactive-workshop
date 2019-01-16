import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCustomers from './customers/customers.reducer';
import * as fromProjects from './projects/projects.reducer';

//Update the shape of the entire application state
export interface AppState {
  customers: fromCustomers.CustomersState
  projects: fromProjects.ProjectsState
}

//Add in feature into combined reducer
export const reducers: ActionReducerMap<AppState> = {
  customers: fromCustomers.customersReducer,
  projects: fromProjects.projectsReducers
};

// -------------------------------------------------------------------
// PROJECTS SELECTORS
// -------------------------------------------------------------------
export const selectProjectsState = createFeatureSelector<fromProjects.ProjectsState>('projects');
export const selectProjectIds = createSelector(
  selectProjectsState,
  fromProjects.selectProjectIds
);
export const selectProjectEntities = createSelector(
  selectProjectsState,
  fromProjects.selectProjectEntities
);
export const selectAllProjects = createSelector(
  selectProjectsState,
  fromProjects.selectAllProjects
);

export const selectCurrentProjectId = createSelector(
  selectProjectsState,
  fromProjects.getSelectedProjectId
);

const emptyProject: Project = {
  id: null,
  title: '',
  details: '',
  percentComplete: 0,
  approved: false,
  constomerId: null
}

export const selectCurrentProject = createSelector(
  selectProjectEntities,
  selectCurrentProjectId,
  (projectEntities, projectId) => {
    return projectId ? projectEntities[projectId] : emptyProject;
  }  
);

// -------------------------------------------------------------------
// CUSTOMERS SELECTORS
// -------------------------------------------------------------------
export const selectCustomersState = createFeatureSelector<fromCustomers.CustomersState>('customers');

export const selectAllCustomers = createSelector(
  selectCustomersState,
  fromCustomers.selectAllCustomers
);

export const selectCustomersProjects = createSelector(
  selectAllCustomers,
  selectAllProjects,
  (customers, projects) => {
    return customers.map(customer => {
      return Object.assign({}, {
        ...customer,
        projects: projects.filter(project => project.customerId === customer.id)
      })
    })
  }
)
