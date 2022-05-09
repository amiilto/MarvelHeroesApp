import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map} from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class CharacterApiService {

  PUBLIC_KEY = 'insira aqui a chave publica';
  PRIVATE_KEY = 'insira aqui a chave privada';

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
