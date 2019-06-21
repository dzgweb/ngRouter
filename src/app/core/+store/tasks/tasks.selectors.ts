import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TasksState } from './tasks.state';

export const getTasksState = createFeatureSelector<TasksState>('tasks');

export const getTasksData = createSelector(getTasksState, (state: TasksState) => state.data);
export const getTasksError = createSelector(getTasksState, (state: TasksState) => state.error);
export const getSelectedTask = createSelector(getTasksState, (state: TasksState) => state.selectedTask);
export const getTasksLoaded = createSelector(getTasksState, (state: TasksState) => state.loaded);
