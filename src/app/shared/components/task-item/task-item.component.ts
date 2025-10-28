import { Component, input, output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CategoryEntity } from 'src/app/domain/entities/category.entity';
import { TaskEntity } from 'src/app/domain/entities/task.entity';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  imports: [IonicModule]
})
export class TaskItemComponent {

  task = input.required<TaskEntity>();
  categories = input.required<CategoryEntity[]>();

  toggleTask = output<TaskEntity>();
  deleteTask = output<TaskEntity>();
  editingTask = output<TaskEntity>();

  constructor() { }

  getCategoryColor(categoryId: string): string {
    const category = this.categories().find(c => c.id === categoryId);
    return category?.color || '#6b7280';
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories().find(c => c.id === categoryId);
    return category?.name || 'Sin categoría';
  }

  onToggleTask(task: TaskEntity) {
    this.toggleTask.emit(task);
  }

  onDeleteTask(task: TaskEntity) {
    this.deleteTask.emit(task);
  }

  onEditTask(task: TaskEntity) {
    this.editingTask.emit(task);
  }

}
