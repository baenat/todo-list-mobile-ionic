import { CategoryEntity } from "../entities/category.entity";
import { CategoryRepository } from "../repositories/category.repository";

export class UpdateCategoryUseCase {

  constructor(private repo: CategoryRepository) { }

  async execute(category: CategoryEntity): Promise<void> {
    if (!category.name) throw new Error('El nombre es obligatorio');
    await this.repo.updateCategory(category);
  }
}
