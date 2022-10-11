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
    if(filterString.length >=3){
      for (let user of value) {
        if ((user.name.toLowerCase().includes(filterString.toLowerCase()))) {
          filteredUsers.push(user);
        }
      }
      }
      if(filterString.length <3){
        for (let user of value) {
            filteredUsers.push(user);
        }
        }
      return filteredUsers;
    }

}
