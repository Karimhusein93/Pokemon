import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PokemonListService } from '../pokemon-list/pokemon-list.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any = null;
  subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private pokemonListService: PokemonListService) {}

  set subscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {

      if (this.pokemonListService.pokemons.length) {
        this.pokemon = this.pokemonListService.pokemons.find(i => i.name === params['name']);
      }

      this.subscription = this.pokemonListService.get(params['name']).subscribe((response: any) => {
        this.pokemon = response;
      }, (error: any) => console.log('Error Occurred:', error));
    });
  }
  }
