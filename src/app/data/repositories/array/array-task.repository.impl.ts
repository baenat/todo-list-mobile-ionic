import { Injectable } from '@angular/core';
import { TaskRepository } from 'src/app/domain/repositories/task.repository';
import { TaskEntity } from 'src/app/domain/entities/task.entity';

@Injectable({ providedIn: 'root' })
export class ArrayTaskRepositoryImpl extends TaskRepository {

  private tasks: TaskEntity[] = [
    { id: '1', title: 'Preparar presentación de powerpoint', categoryId: '1', completed: false, createdAt: new Date() },
  ];

  async getTasks(idTask?: string): Promise<TaskEntity[]> { return this.tasks; }

  async addTask(task: TaskEntity): Promise<void> { this.tasks.push(task); }

  async updateTask(task: TaskEntity): Promise<void> {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index >= 0) this.tasks[index] = task;
  }

  async deleteTask(id: string): Promise<void> {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
}
