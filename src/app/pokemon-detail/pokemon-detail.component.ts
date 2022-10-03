import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PokemonListService } from '../pokemon-list/pokemon-list.service';
import { TypeColors } from '../type-colors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any = null;
  subscriptions: Subscription[] = [];
  href: string = "";

  constructor(private route: ActivatedRoute, private pokemonListService: PokemonListService,private router: Router) {}

  set subscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  ngOnInit(): void {
    this.href = this.router.url;
    if(this.href !== '/detail'){
    this.subscription = this.route.params.subscribe(params => {
      if (this.pokemonListService.pokemons.length) {
        this.pokemon = this.pokemonListService.pokemons.find(i => i.name === params['name']);
        if (this.pokemon) {
          this.getEvolution();
          return;
        }
      }

      this.subscription = this.pokemonListService.get(params['name']).subscribe((response: any) => {
        this.pokemon = response;
        this.getEvolution();
      }, (error: any) => console.log('Error Occurred:', error));
    });
  }
  else{
    this.subscription = this.route.params.subscribe(params => {
      if (this.pokemonListService.pokemons.length) {
        this.pokemon = this.pokemonListService.pokemons.find(i => i.name === "bulbasaur");
        if (this.pokemon) {
          this.getEvolution();
          return;
        }
      }

      this.subscription = this.pokemonListService.get("bulbasaur").subscribe((response: any) => {
        this.pokemon = response;
        this.getEvolution();
      }, (error: any) => console.log('Error Occurred:', error));
    });
  }
  
}
  getTypeColor(type: string): string {
      return '#' + TypeColors[type as keyof typeof TypeColors];
  }
  getFirstColorType(pokemon: any): string {
    let type = pokemon && pokemon.types.length > 0 ? pokemon.types[0].type.name : '';
    return '#' + TypeColors[type as keyof typeof TypeColors];
  }
  getId(url: string): number {
    const splitUrl = url.split('/')
    return +splitUrl[splitUrl.length - 2];
  }
  getEvolves(chain: any) {
    this.pokemon.evolutions.push({
      id: this.getId(chain.species.url),
      name: chain.species.name
    });

    if (chain.evolves_to.length) {
      this.getEvolves(chain.evolves_to[0]);
    }
  }

  getEvolution() {
    if (!this.pokemon.evolutions || !this.pokemon.evolutions.length) {
      this.pokemon.evolutions = [];
      this.subscription = this.pokemonListService.getSpecies(this.pokemon.name).subscribe(response => {
        const id = this.getId(response.evolution_chain.url);
        this.subscription = this.pokemonListService.getEvolution(id).subscribe(response => this.getEvolves(response.chain));
      });
    }
    
  }
  } 

