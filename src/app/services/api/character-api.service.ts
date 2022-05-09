import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map} from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class CharacterApiService {

  PUBLIC_KEY = 'd8701bd9fa7772e8315db18b9bf01621';
  PRIVATE_KEY = 'fac133c49f4b3433477e6ae79ff252f8d2df84be';

  HASH = Md5.hashStr('1'+this.PRIVATE_KEY+this.PUBLIC_KEY);
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
