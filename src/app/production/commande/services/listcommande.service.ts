import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commande } from 'src/app/Commercial/commandes/commandes';
import { environment } from 'src/environments/environment';
import { TrancheHoraire } from '../../grille-programmes/trancheHoraire';


@Injectable({
  providedIn: 'root'
})
export class ListcommandeService {

  URL_PRODUC = environment.URL_PRODUC;
  URL_COMMER = environment.URL_COMMER;
  constructor(private http: HttpClient) { }

  list () : Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.URL_PRODUC}evaluatedC`);
  }

  update(commande:Commande) : Observable<Commande> {
    return this.http.put<Commande>(`${this.URL_COMMER}commandes/${commande.id}`,commande);
  }

}
