import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commande } from 'src/app/Commercial/commandes/commandes';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ListcommandeService {

  URL_PRODUC = environment.URL_PRODUC;
  constructor(private http: HttpClient) { }

  list () : Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.URL_PRODUC}evaluatedC`);
  }
}
