import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';
import { PokemonDetails } from '../models/pokemon-details';

@Injectable({
  providedIn: 'root',
})
export class PokemonListService {
  private _pokemons: any[] = [];
  private urlDetails = 'https://pokeapi.co/api/v2/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  get pokemons(): any[] {
    return this._pokemons;
  }
  getPokemons(pokemonUrl:string): Observable<Pokemon> {
    return this.http
      .get<Pokemon>(pokemonUrl)
      .pipe(catchError(this.handleError));
  }
  get(name: string): Observable<any> {
    return this.http.get<any>(`${this.urlDetails}pokemon/${name}`);
  }
  getEvolution(id: number): Observable<any> {
    const url = `${this.urlDetails}evolution-chain/${id}`;
    return this.http.get<any>(url);
  }
  getDamage(id: number): Observable<any> {
    const url = `${this.urlDetails}move/${id}`;
    return this.http.get<any>(url);
  }

  getPokemonDetails(name: string): Observable<PokemonDetails> {
    return this.http
      .get<PokemonDetails>(`${this.urlDetails}pokemon/${name}`)
      .pipe(catchError(this.handleError));
  }

  getSpecies(name: string): Observable<any> {
    const url = `${this.urlDetails}pokemon-species/${name}`;
    return this.http.get<any>(url);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
