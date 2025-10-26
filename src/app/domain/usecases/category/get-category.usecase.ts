import { CategoryEntity } from "../../entities/category.entity";
import { CategoryRepository } from "../../repositories/category.repository";

export class GetCategoryUseCase {

  constructor(private repo: CategoryRepository) { }

  async execute(idCategory?: string): Promise<CategoryEntity[]> {
    return await this.repo.getCategories(idCategory);
  }
}
