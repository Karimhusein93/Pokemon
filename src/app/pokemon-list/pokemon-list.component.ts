import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { PokemonDetails } from '../pokemon-detail/pokemon-details';
import { Pokemon} from './pokemon';
import { PokemonListService } from './pokemon-list.service';
import { PokemonResults } from './pokemon-results';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  constructor(private pokemonService: PokemonListService){
  }

  pokemons: Pokemon;
  subscriptions: Subscription[] = [];
  loading:boolean=true;

  get pokemonsList(): any[] {
    return this.pokemonService.pokemons;
  }

  set subscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }
  ngOnInit(): void {
   
    this.getPokemons(this.loading);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription ? subscription.unsubscribe() : 0);
  }

  getPokemons(loading:boolean): any {
    if(loading){
    this.pokemonService.getPokemons()
    .subscribe((data: Pokemon) => {
      this.pokemons = data;
      if (this.pokemons.results && this.pokemons.results.length) {
        this.pokemons.results.forEach(pokemon => {
          pokemon.id = pokemon.url.split('/')[
            pokemon.url.split('/').length - 2
          ];
          this.loading = false;
          this.getPokemonDetails(pokemon);
        });
      }
    });
  }
  else{
    this.pokemonService.getMorePokemons()
    .subscribe((data: Pokemon) => {
      this.pokemons = data;
      if (this.pokemons.results && this.pokemons.results.length) {
        this.pokemons.results.forEach(pokemon => {
          pokemon.id = pokemon.url.split('/')[
            pokemon.url.split('/').length - 2
          ];
          this.loading = true;
          this.getPokemonDetails(pokemon);
        });
      }
    });
  }
}
getPokemonDetails(pokemon: PokemonResults): void {
  this.pokemonService
    .getPokemonDetails(pokemon.name)
    .subscribe((details: PokemonDetails) => {
      pokemon.details = details;
    });
}

  // getFilteredList(){
  //   this.filteredList = this.pokemons.results.filter(
  //     pokemon => pokemon.name.includes(this.pokemon));
    
  //   }
}