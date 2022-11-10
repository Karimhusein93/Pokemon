import { PokemonResults } from './pokemon-results';

export interface Pokemon {
  count: number;
  next: string;
  results: PokemonResults[];
}
