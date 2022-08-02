import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client, Iclient } from '../client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private _url = 'http://localhost:8000/api/commercial/clients';
  URL_COMMER = environment.URL_COMMER;

  constructor(private http:HttpClient) { }


  list () : Observable<any> {
    return this.http.get<any>(this._url);
  }

  getOneClient (id: number) : Observable<any> {
    return this.http.get<any>(`${this.URL_COMMER}client/${id}`);
  }

  getAllCommande (id:number) : Observable<any> {
    return this.http.get<any>(`${this.URL_COMMER}historique/commandes/${id}`);
  }

  add(client:Client) : Observable<Client> {
    return this.http.post<Client>(this._url, client);
  }

  update(client:Iclient) : Observable<Iclient> {
    return this.http.put<Iclient>(`${this._url}/${client.id}`,client);
  }

  delete(client:Iclient) : Observable<boolean>{
    return this.http.delete<boolean>(`${this._url}/${client.id}`);
  }

  search(x:string) : Observable<Iclient> {
    console.log('ici');
    console.log(x);
    return this.http.get<Iclient>('http://localhost:8000/api/products/search/'+x);
  }

  uploadPhotoClient(clientId?: string, image?: any): Observable<Client> {
    console.log(`${this.URL_COMMER}${clientId}/images`);
    return this.http.post<Client>(
      `${this.URL_COMMER}clients/${clientId}/images`,
      image
    );
  }

}
