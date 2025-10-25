import { CategoryEntity } from "../entities/category.entity";

export abstract class CategoryRepository {
  abstract getCategories(): Promise<CategoryEntity[]>;
  abstract addCategory(category: CategoryEntity): Promise<void>;
  abstract updateCategory(category: CategoryEntity): Promise<void>;
  abstract deleteCategory(id: string): Promise<void>;
}
