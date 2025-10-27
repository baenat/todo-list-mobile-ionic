import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { CategoryEntity } from '@domain/entities/category.entity';
import { CategoryRepository } from '@domain/repositories/category.repository';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCategoryRepositoryImpl extends CategoryRepository {

  constructor(
    private firestore: Firestore,
  ) {
    super();
  }

  async getCategories(): Promise<CategoryEntity[]> {
    const categoriesRef = collection(this.firestore, 'category');
    return firstValueFrom(collectionData(categoriesRef, { idField: 'id' }) as Observable<CategoryEntity[]>);
  }

  async addCategory(category: CategoryEntity): Promise<void> {
    const categoriesRef = collection(this.firestore, 'category');
    addDoc(categoriesRef, category);
  }

  async updateCategory(category: CategoryEntity): Promise<void> {
    const categoriesRef = doc(this.firestore, `category/${category.id}`)
    updateDoc(categoriesRef, { ...category });
  }

  async deleteCategory(id: string): Promise<void> {
    const categoriesRef = doc(this.firestore, `category/${id}`);
    deleteDoc(categoriesRef);
  }
}

