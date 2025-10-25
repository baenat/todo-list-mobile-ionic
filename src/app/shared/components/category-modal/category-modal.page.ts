import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonInput, IonLabel, IonModal } from '@ionic/angular/standalone';
import { Category } from 'src/app/domain/entities/category.entity';

@Component({
  selector: 'category-modal',
  templateUrl: './category-modal.page.html',
  styleUrls: ['./category-modal.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonModal, IonButton, IonLabel, IonInput]
})
export class CategoryModalPage implements OnInit {

  category = input<Category | null>(null);
  title = input<string>('Nueva Categoría');
  isOpen = input<boolean>(false);

  saveCategory = output<Category>();
  closeModal = output<void>();

  categoryName = signal<string>('');
  categoryColor = signal<string>('');

  constructor() { }

  ngOnInit() {
    this.categoryName.set(this.category()?.name ?? '');
    this.categoryColor.set(this.category()?.color ?? '#3b82f6');
  }

  save() {
    const category = this.categoryName().trim();
    if (category) {
      const savedCategory: Category = {
        id: this.category()?.id || crypto.randomUUID(),
        name: category,
        color: this.categoryColor()
      };
      this.saveCategory.emit(savedCategory);
      this.closeModal.emit();
    }
  }

  onChangeName(event: Event) {
    const input = event.target as HTMLInputElement;
    const color = String(input.value ?? '');
    this.categoryName.set(color);
  }

  onSelectColor(event: Event) {
    const input = event.target as HTMLInputElement;
    const color = String(input.value ?? '');
    this.categoryColor.set(color);
  }
}
