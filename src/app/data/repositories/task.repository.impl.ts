import { Injectable } from '@angular/core';
import { TaskRepository } from 'src/app/domain/repositories/task.repository';
import { Task } from 'src/app/domain/entities/task.entity';

@Injectable({ providedIn: 'root' })
export class TaskRepositoryImpl extends TaskRepository {

  private tasks: Task[] = [
    { id: '1', title: 'Preparar presentación de...', categoryId: '1', completed: false, createdAt: new Date() },
    { id: '2', title: 'Comprar víveres', categoryId: '2', completed: false, createdAt: new Date() },
    { id: '3', title: 'Terminar proyecto de Ionic', categoryId: '1', completed: true, createdAt: new Date() },
    { id: '4', title: 'Estudiar para el examen de...', categoryId: '3', completed: false, createdAt: new Date() },
  ];

  async getTasks(): Promise<Task[]> { return this.tasks; }

  async addTask(task: Task): Promise<void> { this.tasks.push(task); }

  async updateTask(task: Task): Promise<void> {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index >= 0) this.tasks[index] = task;
  }

  async deleteTask(id: string): Promise<void> {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
}
