import { PokemonDetails } from "../pokemon-detail/pokemon-details";

export interface PokemonResults {
  name: string;
  url: string;
  id?: string;
  details?: PokemonDetails;
  description?: string;
}
