import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Conducteur } from '../conducteur/conducteur';
import { TrancheHoraire } from '../grille-programmes/trancheHoraire';

@Injectable({
  providedIn: 'root'
})
export class GrilleProgrammesService {

  URL_PRODUC = environment.URL_PRODUC;
  constructor(private http:HttpClient) { }

  list () : Observable<any> {
    return this.http.get<any>(`${this.URL_PRODUC}trancheHoraires`);
  }

  update (trancheH:TrancheHoraire) : Observable<TrancheHoraire> {
    return this.http.put<TrancheHoraire>(`${this.URL_PRODUC}trancheHoraires/${trancheH.id}`,trancheH);
  }

  searchConduc (date1: Date, date2: Date) : Observable<Conducteur[]> {
    return this.http.get<Conducteur[]>(`${this.URL_PRODUC}searchConduc/`+ `${date1}/`+ `${date2}`);
  }
}
