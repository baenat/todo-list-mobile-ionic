import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CategoryRepositoryImpl } from '@data/repositories/category.repository.impl';
import { TaskRepositoryImpl } from '@data/repositories/task.repository.impl';
import { CategorySelectorPage } from "@shared/components/category-selector/category-selector.page";
import { TaskModalPage } from "@shared/components/task-modal/task-modal.page";
import { Category } from 'src/app/domain/entities/category.entity';
import { Task } from 'src/app/domain/entities/task.entity';
import { AddTaskUseCase } from 'src/app/domain/usecases/add-task.usecase';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CategorySelectorPage, TaskModalPage, RouterLink]
})
export class TasksPage implements OnInit {

  tasks: Task[] = [];
  categories: Category[] = [];

  newTaskTitle = signal<string>('');

  selectedCategory = signal<string>('all');
  showTaskModal = signal<boolean>(false);
  editingTask = signal<Task | null>(null);
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

  async addTask(task: Task) {
    const useCaseTask = new AddTaskUseCase(this.taskRepo);
    await useCaseTask.execute(task);
    this.tasks = await this.taskRepo.getTasks();
  }

  async deleteTask(task: Task) {
    await this.taskRepo.deleteTask(task.id);
    this.tasks = await this.taskRepo.getTasks();
  }

  toggleTask(id: string) {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.completed = !task.completed;
  }

  getCategoryColor(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category?.color || '#6b7280';
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category?.name || 'Sin categoría';
  }

}
