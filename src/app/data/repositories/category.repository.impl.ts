import { Injectable } from '@angular/core';
import { CategoryRepository } from 'src/app/domain/repositories/category.repository';
import { Category } from 'src/app/domain/entities/category.entity';

@Injectable({ providedIn: 'root' })
export class CategoryRepositoryImpl extends CategoryRepository {

  private categories: Category[] = [
    { id: '1', name: 'Trabajo', color: '#3b82f6' },
    { id: '2', name: 'Personal', color: '#ec4899' },
    { id: '3', name: 'Estudios', color: '#10b981' },
  ];

  async getCategories(): Promise<Category[]> { return this.categories; }

  async addCategory(category: Category): Promise<void> { this.categories.push(category); }

  async updateCategory(category: Category): Promise<void> {
    const index = this.categories.findIndex(c => c.id === category.id);
    if (index >= 0) this.categories[index] = category;
  }

  async deleteCategory(id: string): Promise<void> {
    this.categories = this.categories.filter(c => c.id !== id);
  }
}
