import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategorySelectorPage } from './category-selector.page';

describe('CategorySelectorPage', () => {
  let component: CategorySelectorPage;
  let fixture: ComponentFixture<CategorySelectorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySelectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
