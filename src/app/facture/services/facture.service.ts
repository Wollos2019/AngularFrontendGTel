import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFacture } from '../ifacture';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  URL_COMMER = environment.URL_COMMER;
  constructor(private http:HttpClient) { }

  list () : Observable<any> {
    return this.http.get<any>(`${this.URL_COMMER}factures`);
  }

  add(facture:IFacture) : Observable<IFacture> {
    return this.http.post<IFacture>(`${this.URL_COMMER}factures`, facture);
  }
}
