import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonInput, IonModal, IonSelect, IonSelectOption, } from '@ionic/angular/standalone';
import { CategoryEntity } from 'src/app/domain/entities/category.entity';
import { TaskEntity } from 'src/app/domain/entities/task.entity';

@Component({
  selector: 'task-modal',
  templateUrl: './task-modal.page.html',
  styleUrls: ['./task-modal.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonModal, IonButton, IonInput, IonSelect, IonSelectOption]
})
export class TaskModalPage {

  task = input<TaskEntity | null>();
  categories = input.required<CategoryEntity[]>();

  isOpen = input.required<boolean>();
  title = input<string>('Nueva Tarea');

  saveTask = output<TaskEntity>();
  closeModal = output<void>();

  nameTask = signal<string>('');
  categoryTask = signal<string>('');

  constructor() { }

  onInputName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.nameTask.set(String(input.value ?? ''));
  }

  onCategoryChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.categoryTask.set(String(input.value ?? ''));
  }

  save() {
    const task = this.nameTask();
    const category = this.categoryTask();
    if (task && category) {
      const savedTask: TaskEntity = {
        id: this.task()?.id || crypto.randomUUID(),
        title: task,
        categoryId: category,
        completed: this.task()?.completed || false,
        createdAt: new Date(),
      };
      this.saveTask.emit(savedTask);
      this.closeModal.emit();
    }
  }

}
