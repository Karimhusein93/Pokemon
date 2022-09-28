import { Component, OnInit} from '@angular/core';
import { Pokemon} from './pokemon';
import { PokemonResults } from './pokemon-results';
import { PokemonDetails } from '../pokemon-detail/pokemon-details';
import { PokemonListService } from './pokemon-list.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  constructor(private pokemonService: PokemonListService) { }
  pokemons: Pokemon;
  nextPokemons:Pokemon;
  loadMorePokemons:boolean=false;
  ngOnInit(): void {
   
    this.getPokemons();
   
  }
  getPokemons(): any {
    this.loadMorePokemons = false;
    this.pokemonService.getPokemons()
    .subscribe((data: Pokemon) => {
      this.pokemons = data;
      console.log(data);
      if (this.pokemons.results && this.pokemons.results.length) {
        this.pokemons.results.forEach(pokemon => {
          pokemon.id = pokemon.url.split('/')[
            pokemon.url.split('/').length - 2
          ];

          this.getPokemonDetails(pokemon);
        });
      }
    });
  }
  getMorePokemons():any{
  this.pokemonService.getMorePokemons()
  .subscribe((data: Pokemon) => {
    this.nextPokemons = data;
    console.log(data);
    if (this.nextPokemons.results && this.nextPokemons.results.length) {
      this.nextPokemons.results.forEach(pokemon => {
        pokemon.id = pokemon.url.split('/')[
          pokemon.url.split('/').length - 2
        ];
        this.loadMorePokemons = true;
        this.getPokemonDetails(pokemon);
      });
    }
  });
}

  /**
   * Gets and sets a pokemons details
   */
  getPokemonDetails(pokemon: PokemonResults): void {
    this.pokemonService
      .getPokemonDetails(pokemon.name)
      .subscribe((details: PokemonDetails) => {
        pokemon.details = details;
        // when last pokemon details have been loaded
        
      });
  }
  }