import { Injectable } from '@angular/core';
import { TaskEntity } from 'src/app/domain/entities/task.entity';
import { TaskRepository } from 'src/app/domain/repositories/task.repository';

@Injectable({
  providedIn: 'root'
})
export class FirebaseTaskRepositoryImpl extends TaskRepository {



  async getTasks(): Promise<TaskEntity[]> { throw new Error('FirebaseTaskRepositoryImpl: Not implemented'); }
  async addTask(task: TaskEntity): Promise<void> { throw new Error('FirebaseTaskRepositoryImpl: Not implemented'); }
  async updateTask(task: TaskEntity): Promise<void> { throw new Error('FirebaseTaskRepositoryImpl: Not implemented'); }
  async deleteTask(id: string): Promise<void> { throw new Error('FirebaseTaskRepositoryImpl: Not implemented'); }
}
