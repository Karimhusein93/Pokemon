import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private pokemonService: PokemonListService,public router: Router){
  }

  pokemons: Pokemon;
  subscriptions: Subscription[] = [];
  loading:boolean=true;
  query:'';
  pokemonForm = new FormGroup({
    pokemon: new FormControl('', [Validators.minLength(3),Validators.pattern('^[a-zA-Z ]*$')]),
  });
  get pokemon() {
    return this.pokemonForm.get('pokemon');
  }
  
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
}