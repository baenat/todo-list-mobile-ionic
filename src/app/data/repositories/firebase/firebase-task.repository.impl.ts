import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { firstValueFrom, Observable } from 'rxjs';
import { TaskEntity } from 'src/app/domain/entities/task.entity';
import { TaskRepository } from 'src/app/domain/repositories/task.repository';

@Injectable({
  providedIn: 'root'
})
export class FirebaseTaskRepositoryImpl extends TaskRepository {

  constructor(
    private firestore: Firestore,
  ) {
    super();
  }

  async getTasks(): Promise<TaskEntity[]> {
    const tasksRef = collection(this.firestore, 'task');
    return await firstValueFrom(collectionData(tasksRef, { idField: 'id' }) as Observable<TaskEntity[]>);
  }

  async addTask(task: TaskEntity): Promise<void> {
    const tasksRef = collection(this.firestore, 'task');
    addDoc(tasksRef, task);
  }

  async updateTask(task: TaskEntity): Promise<void> {
    const tasksRef = doc(this.firestore, `task/${task.id}`)
    updateDoc(tasksRef, { ...task });
  }

  async deleteTask(id: string): Promise<void> {
    const noteDocRef = doc(this.firestore, `task/${id}`);
    deleteDoc(noteDocRef);
  }
}
