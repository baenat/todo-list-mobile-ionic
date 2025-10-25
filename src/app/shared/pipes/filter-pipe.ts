import { Pipe, PipeTransform } from '@angular/core';
import { TaskEntity } from 'src/app/domain/entities/task.entity';

@Pipe({
  name: 'filterBy'
})
export class FilterPipe implements PipeTransform {

  transform(array: any[], filterBy: string = '', column: string = 'categoryId'): TaskEntity[] {

    if (!filterBy) return array;
    if (!array) return array;

    return array.filter(task => task[column] === filterBy);
  }

}
