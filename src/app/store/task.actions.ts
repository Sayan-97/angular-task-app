import { createAction, props } from '@ngrx/store';
import { Task } from '../services/task.service';

export const loadTasks = createAction('[Task] Load Tasks');
export const loadTasksSuccess = createAction('[Task] Load Tasks Success', props<{ tasks: Task[] }>());
export const loadTasksFailure = createAction('[Task] Load Tasks Failure', props<{ error: any }>());

export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());
export const addTaskSuccess = createAction('[Task] Add Task Success', props<{ task: Task }>());
export const addTaskFailure = createAction('[Task] Add Task Failure', props<{ error: any }>());

export const deleteTask = createAction('[Task] Delete Task', props<{ id: number }>());
export const deleteTaskSuccess = createAction('[Task] Delete Task Success', props<{ id: number }>());
export const deleteTaskFailure = createAction('[Task] Delete Task Failure', props<{ error: any }>());

