import { Injectable } from '@angular/core';
import { CategoryRepository } from 'src/app/domain/repositories/category.repository';
import { CategoryEntity } from 'src/app/domain/entities/category.entity';

@Injectable({ providedIn: 'root' })
export class ArrayCategoryRepositoryImpl extends CategoryRepository {

  private categories: CategoryEntity[] = [
    { id: '1', name: 'Trabajo', color: '#3b82f6' },
    { id: '2', name: 'Personal', color: '#ec4899' },
    { id: '3', name: 'Estudios', color: '#10b981' },
  ];

  async getCategories(idCategory?: string): Promise<CategoryEntity[]> { return this.categories; }

  async addCategory(category: CategoryEntity): Promise<void> { this.categories.push(category); }

  async updateCategory(category: CategoryEntity): Promise<void> {
    const index = this.categories.findIndex(c => c.id === category.id);
    if (index >= 0) this.categories[index] = category;
  }

  async deleteCategory(id: string): Promise<void> {
    this.categories = this.categories.filter(c => c.id !== id);
  }
}
