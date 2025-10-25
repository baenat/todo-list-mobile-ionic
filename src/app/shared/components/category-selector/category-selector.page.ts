import { Component, effect, OnInit, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonChip } from "@ionic/angular/standalone";
import { CategoryEntity } from 'src/app/domain/entities/category.entity';
import { CategoryRepositoryImpl } from '@data/repositories/category.repository.impl';

@Component({
  selector: 'category-selector',
  templateUrl: './category-selector.page.html',
  styleUrls: ['./category-selector.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonChip]
})
export class CategorySelectorPage implements OnInit {

  categories = signal<CategoryEntity[]>([]);
  selectedCategory = signal<string>('');
  category = output<string>();

  constructor(
    private categoryRepo: CategoryRepositoryImpl
  ) { }

  categorySelectedEffect = effect(() => {
    this.category.emit(this.selectedCategory());
  })

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.categories.set(await this.categoryRepo.getCategories());
  }
}
