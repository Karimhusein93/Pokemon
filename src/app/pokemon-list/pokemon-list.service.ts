import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pokemon } from './pokemon';
import { PokemonDetails } from '../pokemon-detail/pokemon-details';


@Injectable({
  providedIn: 'root'
})
export class PokemonListService {
  private firstPokemonsUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=30&offset=0';
  private secondPokemonsUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=30&offset=30';
  private urlDetails = 'http://pokeapi.co/api/v2/pokemon';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }
  
  getPokemons(): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.firstPokemonsUrl)
    .pipe(catchError(this.handleError));
  }
  getMorePokemons(): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.secondPokemonsUrl)
    .pipe(catchError(this.handleError));
  }
  getPokemonDetails(name:string): Observable<PokemonDetails> {
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


