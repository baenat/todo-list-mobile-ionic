import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CategoryRepository } from '@domain/repositories/category.repository';
import { TaskRepository } from '@domain/repositories/task.repository';
import { GetCategoryUseCase } from '@domain/usecases/category/get-category.usecase';
import { GetTaskUseCase } from '@domain/usecases/task/get-tasks.usecase';
import { CategorySelectorPage } from "@shared/components/category-selector/category-selector.page";
import { TaskItemComponent } from "@shared/components/task-item/task-item.component";
import { TaskModalPage } from "@shared/components/task-modal/task-modal.page";
import { FilterPipe } from '@shared/pipes/filter-pipe';
import { CategoryEntity } from 'src/app/domain/entities/category.entity';
import { TaskEntity } from 'src/app/domain/entities/task.entity';
import { AddTaskUseCase } from 'src/app/domain/usecases/task/add-task.usecase';
import { DeleteTaskUseCase } from 'src/app/domain/usecases/task/delete-task.usecase';
import { UpdateTaskUseCase } from 'src/app/domain/usecases/task/update-task.usecase';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CategorySelectorPage, TaskModalPage, RouterLink, FilterPipe, TaskItemComponent]
})
export class TasksPage implements OnInit {

  tasks: TaskEntity[] = [];
  categories: CategoryEntity[] = [];

  newTaskTitle = signal<string>('');

  selectedCategory = signal<string>('');
  showTaskModal = signal<boolean>(false);
  editingTask = signal<TaskEntity | null>(null);
  modalTitle = signal<string>('');

  constructor(
    private taskRepo: TaskRepository,
    private categoryRepo: CategoryRepository
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    await this.getTasks();
    await this.getCategories();
  }

  async getTasks() {
    const useCaseTask = new GetTaskUseCase(this.taskRepo);
    this.tasks = await useCaseTask.execute();
  }

  async getCategories() {
    const useCaseCategory = new GetCategoryUseCase(this.categoryRepo);
    this.categories = await useCaseCategory.execute();
  }

  openCreateModal() {
    this.editingTask.set(null);
    this.modalTitle.set('Nueva Tarea');
    this.showTaskModal.set(true);
  }

  closeModal() {
    this.showTaskModal.set(false);
    this.editingTask.set(null);
  }

  async addTask(task: TaskEntity) {
    const useCaseTask = new AddTaskUseCase(this.taskRepo);
    await useCaseTask.execute(task);
    this.getTasks();
  }

  async updateTask(task: TaskEntity) {
    const useCaseTask = new UpdateTaskUseCase(this.taskRepo);
    await useCaseTask.execute(task);
    this.getTasks();
  }

  async deleteTask(task: TaskEntity) {
    const useCaseTask = new DeleteTaskUseCase(this.taskRepo);
    await useCaseTask.execute(task.id);
    this.getTasks();
  }

  onToggleTask(task: TaskEntity) {
    const updateTask = {
      ...task,
      completed: !task.completed
    }
    task.completed = !task.completed;
    this.updateTask(updateTask);
  }

  getCategoryColor(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category?.color || '#6b7280';
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category?.name || 'Sin categoría';
  }

  onDeleteTask(task: TaskEntity) {
    this.deleteTask(task);
  }

}
