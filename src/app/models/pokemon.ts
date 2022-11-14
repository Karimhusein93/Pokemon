import { PokemonResults } from './pokemon-results';

export interface Pokemon {
  count: number;
  next: string;
  previous: string;
  results: PokemonResults[];
}
