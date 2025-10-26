import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CategoryRepositoryImpl } from '@data/repositories/category.repository.impl';
import { TaskRepositoryImpl } from '@data/repositories/task.repository.impl';
import { CategorySelectorPage } from "@shared/components/category-selector/category-selector.page";
import { TaskModalPage } from "@shared/components/task-modal/task-modal.page";
import { CategoryEntity } from 'src/app/domain/entities/category.entity';
import { TaskEntity } from 'src/app/domain/entities/task.entity';
import { AddTaskUseCase } from 'src/app/domain/usecases/task/add-task.usecase';
import { DeleteTaskUseCase } from 'src/app/domain/usecases/task/delete-task.usecase';
import { FilterPipe } from '@shared/pipes/filter-pipe';
import { UpdateTaskUseCase } from 'src/app/domain/usecases/task/update-task.usecase';
import { TaskItemComponent } from "@shared/components/task-item/task-item.component";

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
    private taskRepo: TaskRepositoryImpl,
    private categoryRepo: CategoryRepositoryImpl
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.tasks = await this.taskRepo.getTasks();
    this.categories = await this.categoryRepo.getCategories();
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
    this.tasks = await this.taskRepo.getTasks();
  }

  async updateTask(task: TaskEntity) {
    const useCaseTask = new UpdateTaskUseCase(this.taskRepo);
    await useCaseTask.execute(task);
    this.tasks = await this.taskRepo.getTasks();
  }

  async deleteTask(task: TaskEntity) {
    const useCaseTask = new DeleteTaskUseCase(this.taskRepo);
    await useCaseTask.execute(task.id);
    this.tasks = await this.taskRepo.getTasks();
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
