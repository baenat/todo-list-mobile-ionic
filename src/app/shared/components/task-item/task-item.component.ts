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
    const updateTask = {
      ...task,
      completed: !task.completed
    }
    task.completed = !task.completed;
    // this.updateTask(updateTask);
    this.toggleTask.emit(updateTask)
  }

  onDeleteTask(task: TaskEntity) {
    this.deleteTask.emit(task);
  }

}
