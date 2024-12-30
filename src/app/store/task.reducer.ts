import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as TaskActions from './task.actions';
import { Task } from '../services/task.service';

export interface TaskState extends EntityState<Task> {
  loading: boolean;
  error: any;
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState: TaskState = adapter.getInitialState({
  loading: false,
  error: null
});

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, state => ({ ...state, loading: true })),
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => {
    return adapter.setAll(tasks, { ...state, loading: false });
  }),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(TaskActions.addTaskSuccess, (state, { task }) => {
    return adapter.addOne(task, state);
  }),
  on(TaskActions.deleteTaskSuccess, (state, { id }) => {
    return adapter.removeOne(id, state);
  })
);

export const getTaskState = createFeatureSelector<TaskState>('tasks');

export const {
  selectAll: selectAllTasks,
  selectIds: selectTaskIds,
  selectEntities: selectTaskEntities
} = adapter.getSelectors(getTaskState);

export const selectTasksLoading = createSelector(
  getTaskState,
  (state: TaskState) => state.loading
);

export const selectTasksError = createSelector(
  getTaskState,
  (state: TaskState) => state.error
);

