import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon, PokemonDetail } from '../../models/pokemon';

export interface PokeApiItem {
  name: string;
  url: string;
}

export interface PokeApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeApiItem[];
}

@Injectable({
  providedIn: 'root'
})
export class PokeService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=25';

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<PokeApiResponse>(this.apiUrl).pipe(
      map(response => {
        return response.results.map(item => {
          const urlParts = item.url.split('/').filter(Boolean);
          const id = parseInt(urlParts[urlParts.length - 1], 10);
          return {
            name: item.name,
            url: item.url,
            id: id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          };
        });
      })
    );
  }

  getPokemonDetail(nameOrId: string | number): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
  }
}