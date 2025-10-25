import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryRepositoryImpl } from '@data/repositories/category.repository.impl';
import { IonicModule } from '@ionic/angular';
import { CategoryModalPage } from "@shared/components/category-modal/category-modal.page";
import { Category } from 'src/app/domain/entities/category.entity';

@Component({
  selector: 'categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CategoryModalPage]
})
export class CategoriesPage implements OnInit {

  categories: Category[] = [];
  buttons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => this.showAlert.set(false),
    },
    {
      text: 'Aceptar',
      role: 'confirm',
      handler: () => this.confirmDelete(),
    }
  ];

  showCategoryModal = signal<boolean>(false);
  editingCategory = signal<Category | null>(null);
  modalTitle = signal<string>('Nueva Categoría');
  showAlert = signal<boolean>(false);
  selectedId = signal<string>('');


  constructor(
    private categoryRepo: CategoryRepositoryImpl,
  ) { }

  ngOnInit() {
    this.loadCategories();
  }

  async loadCategories() {
    this.categories = await this.categoryRepo.getCategories();
  }

  openCreateModal() {
    this.editingCategory.set(null);
    this.modalTitle.set('Nueva Categoría');
    this.showCategoryModal.set(true);
  }

  openEditModal(category: Category) {
    this.editingCategory.set(category);
    this.modalTitle.set('Editar Categoría');
    this.showCategoryModal.set(true);
  }

  openDeleteAlert(id: string) {
    this.selectedId.set(id);
    this.showAlert.set(true);
  }

  closeModal() {
    this.showCategoryModal.set(false);
    this.editingCategory.set(null);
  }

  deleteCategory(categoryId: string) {
    // validación para verificar si tiene tareas
    this.categories = this.categories.filter(c => c.id !== categoryId);
  }

  async confirmDelete() {
    console.log('Delete ...', this.selectedId());
  }

  saveCategory(event: Category) {
    console.log('Save ...', event);
  }

}
