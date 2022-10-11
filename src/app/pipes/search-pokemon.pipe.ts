import { Pipe, PipeTransform } from '@angular/core';
import { PokemonDetails } from '../pokemon-detail/pokemon-details';
import { Pokemon } from '../pokemon-list/pokemon';
import { PokemonResults } from '../pokemon-list/pokemon-results';

@Pipe({
  name: 'searchPokemon'
})
export class SearchPokemonPipe implements PipeTransform {

  transform(value: PokemonResults[], filterString: string, property: string): PokemonResults[] {
    if (value.length === 0 || !filterString) {
      return value;
    }
    let filteredUsers: PokemonResults[] = [];
    for (let user of value) {
      if (user.name.toLowerCase().includes(filterString.toLowerCase())) {
        filteredUsers.push(user);
      }
    }
    return filteredUsers;
  }

}
