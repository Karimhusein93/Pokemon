import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pokemon } from './pokemon';
import { PokemonDetails } from '../pokemon-detail/pokemon-details';

@Injectable({
  providedIn: 'root',
})
export class PokemonListService {
  private _pokemons: any[] = [];
  private firstPokemonUrl =
    'http://pokeapi.co/api/v2/pokemon/?limit=30&offset=0';
  private secondPokemonUrl =
    'http://pokeapi.co/api/v2/pokemon/?limit=30&offset=30';
  private urlDetails = 'http://pokeapi.co/api/v2/pokemon/';
  loading: boolean = false;


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  get pokemons(): any[] {
    return this._pokemons;
  }
  getPokemons(): Observable<Pokemon> {
      return this.http
        .get<Pokemon>(this.firstPokemonUrl)
        .pipe(catchError(this.handleError));
  }
    getMorePokemons(): Observable<Pokemon> {
    
        return this.http
          .get<Pokemon>(this.secondPokemonUrl)
          .pipe(catchError(this.handleError));
      
  }
  get(name: string): Observable<any> {
    return this.http.get<any>(`${this.urlDetails}${name}`);
    
  }

  getPokemonDetails(name: string): Observable<PokemonDetails> {
    return this.http
      .get<PokemonDetails>(`${this.urlDetails}/${name}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}

// private urlDetails = 'http://pokeapi.co/api/v2/pokemon/';
// private pokemonApiUrl = 'http://pokeapi.co/api/v2/'
// private _pokemons: any[] = [];
// constructor(private http: HttpClient) { }

// get pokemons(): any[] {
//   return this._pokemons;
// }

// getType(pokemon: any): string {
//   return pokemon && pokemon.types.length > 0 ? pokemon.types[0].type.name : '';
// }

// get(name: string): Observable<any> {
//   const url = `${this.urlDetails}${name}`;
//   return this.http.get<any>(url);
// }

// getEvolution(id: number): Observable<any> {
//   const url = `${this.pokemonApiUrl}evolution-chain/${id}`;
//   return this.http.get<any>(url);
// }

// getSpecies(name: string): Observable<any> {
//   const url = `${this.pokemonApiUrl}pokemon-species/${name}`;
//   return this.http.get<any>(url);
// }
// }
