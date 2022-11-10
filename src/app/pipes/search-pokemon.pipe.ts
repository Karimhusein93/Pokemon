import { Pipe, PipeTransform } from '@angular/core';
import { PokemonResults } from '../models/pokemon-results';;

@Pipe({
  name: 'searchPokemon',
})
export class SearchPokemonPipe implements PipeTransform {
  transform(
    value: PokemonResults[],
    filterString: string,
    property: string
  ): PokemonResults[] {
    if (value.length === 0 || !filterString) {
      return value;
    }
    let filteredUsers: PokemonResults[] = [];
    if (filterString.length >= 3) {
      for (let user of value) {
        if (user.name.toLowerCase().includes(filterString.toLowerCase())) {
          filteredUsers.push(user);
        }
      }
    }
    if (filterString.length < 3) {
      for (let user of value) {
        filteredUsers.push(user);
      }
    }
    return filteredUsers;
  }
}
