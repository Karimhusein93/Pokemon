import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PokemonDetails } from '../pokemon-detail/pokemon-details';
import { Observable,throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonDetailService {
 
  private urlDetails = 'http://pokeapi.co/api/v2/pokemon/';
  private _pokemons: any[] = [];
  constructor(private http: HttpClient) { }

  get pokemons(): any[] {
    return this._pokemons;
  }
  


  getType(pokemon: any): string {
    return pokemon && pokemon.types.length > 0 ? pokemon.types[0].type.name : '';
  }

  get(name: string): Observable<any> {
    const url = `${this.urlDetails}${name}`;
    return this.http.get<any>(url);
  }


  getEvolution(id: number): Observable<any> {
    const url = `${this.urlDetails}evolution-chain/${id}`;
    return this.http.get<any>(url);
  }

  getSpecies(name: string): Observable<any> {
    const url = `${this.urlDetails}pokemon-species/${name}`;
    return this.http.get<any>(url);
  }
}
