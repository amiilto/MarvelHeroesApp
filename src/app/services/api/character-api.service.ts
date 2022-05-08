import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterApiService {

  PUBLIC_KEY = 'd8701bd9fa7772e8315db18b9bf01621';
  HASH = 'f017f820da56529aaabcba4e26380aee';
  BASE_API_URL = `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`;

  constructor(private http: HttpClient) { }

  getCharacters(offset: string, optionalParams?: string): Observable<any>{
    let fullURL: string = this.BASE_API_URL+'&offset='+offset+'&limit=10';
    if (optionalParams)
    {
      fullURL = fullURL+'&name='+optionalParams;
    }

    return this.http.get(fullURL).pipe(
      map((data: any) => data.data));
  }
}
