import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input() tasks: Task[] | null = [];
  @Output() deleteTaskEvent = new EventEmitter<number>();

  onDelete(taskId: number) {
    this.deleteTaskEvent.emit(taskId);
  }
}
