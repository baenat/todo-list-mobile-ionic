import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryRepository } from '@domain/repositories/category.repository';
import { GetCategoryUseCase } from '@domain/usecases/category/get-category.usecase';
import { IonicModule } from '@ionic/angular';
import { CategoryModalPage } from "@shared/components/category-modal/category-modal.page";
import { CategoryEntity } from 'src/app/domain/entities/category.entity';
import { AddCategoryUseCase } from 'src/app/domain/usecases/category/add-category.usecase';
import { DeleteCategoryUseCase } from 'src/app/domain/usecases/category/delete-category.usecase';
import { UpdateCategoryUseCase } from 'src/app/domain/usecases/category/update-category.usecase';

@Component({
  selector: 'categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CategoryModalPage]
})
export class CategoriesPage implements OnInit {

  categories: CategoryEntity[] = [];
  buttons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => this.showAlert.set(false),
    },
    {
      text: 'Aceptar',
      role: 'confirm',
      handler: () => this.deleteCategory(),
    }
  ];

  showCategoryModal = signal<boolean>(false);
  editingCategory = signal<CategoryEntity | null>(null);
  modalTitle = signal<string>('Nueva Categoría');
  showAlert = signal<boolean>(false);
  selectedCategory = signal<CategoryEntity | null>(null);


  constructor(
    private categoryRepo: CategoryRepository,
  ) { }

  ngOnInit() {
    this.loadCategories();
  }

  async loadCategories() {
    await this.getCategories();
  }

  async getCategories() {
    const useCaseCategory = new GetCategoryUseCase(this.categoryRepo);
    this.categories = await useCaseCategory.execute();
  }

  openCreateModal() {
    this.editingCategory.set(null);
    this.modalTitle.set('Nueva Categoría');
    this.showCategoryModal.set(true);
  }

  openEditModal(category: CategoryEntity) {
    this.editingCategory.set(category);
    this.modalTitle.set('Editar Categoría');
    this.showCategoryModal.set(true);
  }

  openDeleteAlert(category: CategoryEntity) {
    this.selectedCategory.set(category);
    this.showAlert.set(true);
  }

  closeModal() {
    this.showCategoryModal.set(false);
    this.editingCategory.set(null);
  }

  async addCategory(task: CategoryEntity) {
    const useCaseCategory = new AddCategoryUseCase(this.categoryRepo);
    await useCaseCategory.execute(task);
    this.getCategories();
  }

  async updateCategory(task: CategoryEntity) {
    const useCaseCategory = new UpdateCategoryUseCase(this.categoryRepo);
    await useCaseCategory.execute(task);
    this.getCategories();
  }

  async deleteCategory() {
    const category = this.selectedCategory();
    if (!category) return;

    const useCaseTask = new DeleteCategoryUseCase(this.categoryRepo);
    await useCaseTask.execute(category.id);
    this.getCategories();
  }

  async handleCategory(category: CategoryEntity) {
    (this.editingCategory()) ? await this.updateCategory(category) : await this.addCategory(category);
  }

}
