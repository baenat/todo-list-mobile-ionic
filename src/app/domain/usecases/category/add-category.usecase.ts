import { CategoryEntity } from "../../entities/category.entity";
import { CategoryRepository } from "../../repositories/category.repository";

export class AddCategoryUseCase {

  constructor(private repo: CategoryRepository) { }

  async execute(category: CategoryEntity): Promise<void> {
    if (!category.name) throw new Error('El nombre es obligatorio');
    await this.repo.addCategory(category);
  }
}
