import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Iclient } from '../client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private _url = 'http://localhost:8000/api/commercial/clients';

  constructor(private http:HttpClient) { }
  

  list () : Observable<any> {
    return this.http.get<any>(this._url);
  }

  add(client:Iclient) : Observable<Iclient> {
    return this.http.post<Iclient>(this._url, client);
  }

  update(client:Iclient) : Observable<Iclient> {
    return this.http.put<Iclient>(`${this._url}/${client.idClient}`,client);
  }

  delete(client:Iclient) : Observable<boolean>{
    return this.http.delete<boolean>(`${this._url}/${client.idClient}`);
  }

  search(x:string) : Observable<Iclient> {
    console.log('ici');
    console.log(x);
    return this.http.get<Iclient>('http://localhost:8000/api/products/search/'+x);
  }

}
