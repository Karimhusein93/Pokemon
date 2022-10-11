import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../product';

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

  transform(value: Product[], filterString: string, property: string): Product[] {
    if (value.length === 0 || !filterString) {
      return value;
    }
    let filteredUsers: Product[] = [];
    for (let user of value) {
      if (user.name.toLowerCase().includes(filterString.toLowerCase())) {
        filteredUsers.push(user);
      }
    }
    return filteredUsers;
  }

}
