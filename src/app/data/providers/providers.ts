import { Provider } from "@angular/core";
import { ArrayCategoryRepositoryImpl } from "@data/repositories/array/array-category.repository.impl";
import { ArrayTaskRepositoryImpl } from "@data/repositories/array/array-task.repository.impl";
import { FirebaseCategoryRepositoryImpl } from "@data/repositories/firebase/firebase-category.repository.impl";
import { FirebaseTaskRepositoryImpl } from "@data/repositories/firebase/firebase-task.repository.impl";
import { CategoryRepository } from "src/app/domain/repositories/category.repository";
import { TaskRepository } from "src/app/domain/repositories/task.repository";

export const appProviders: Provider[] = [
  /* Array Local */
  {
    provide: TaskRepository,
    useClass: ArrayTaskRepositoryImpl
  },
  {
    provide: CategoryRepository,
    useClass: ArrayCategoryRepositoryImpl
  },
  /* Firebase */
/*   {
    provide: TaskRepository,
    useClass: FirebaseTaskRepositoryImpl
  },
  {
    provide: CategoryRepository,
    useClass: FirebaseCategoryRepositoryImpl
  }, */

];
