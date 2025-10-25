import { CategoryRepository } from "../repositories/category.repository";

export class DeleteCategoryUseCase {

  constructor(private repo: CategoryRepository) { }

  async execute(idCategory: string): Promise<void> {
    if (!idCategory) throw new Error('El ID es obligatorio');
    await this.repo.deleteCategory(idCategory);
  }
}
