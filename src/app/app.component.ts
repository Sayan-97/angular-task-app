import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskService } from './services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksComponent } from './components/tasks/tasks.component';
import { Store } from '@ngrx/store';
import * as TaskActions from './store/task.actions';
import * as fromTask from './store/task.reducer';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'task-manager';
  tasks$: Observable<Task[]>;
  newTask: Task = { id: 0, title: '', completed: false };

  constructor(private store: Store) {
    this.tasks$ = this.store.select(fromTask.selectAllTasks);
  }

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasks());
  }

  addTask() {
    if (this.newTask.title.trim()) {
      this.store.dispatch(TaskActions.addTask({ task: this.newTask }));
      this.newTask = { id: 0, title: '', completed: false };
    }
  }

  deleteTask(taskId: number) {
    this.store.dispatch(TaskActions.deleteTask({ id: taskId }));
  }
}
