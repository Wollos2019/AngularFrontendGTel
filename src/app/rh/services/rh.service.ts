import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Personal } from '../models/personal.model';

@Injectable({
  providedIn: 'root'
})
export class RhService {

  URL_RH = environment.URL_RH;
  constructor(private httpClient: HttpClient) {}
  /**
   * GESTION DES PERSONNELS
   */

   getAllPersonals(params = ''): Observable<Personal[]> {
     if(params){
      return this.httpClient.get<Personal[]>(
        `${this.URL_RH}personals?${params}`
      );
     }
     return this.httpClient.get<Personal[]>(
      `${this.URL_RH}personals`
    );
    
  }

  getOnePersonal(id: number): Observable<Personal> {
    return this.httpClient.get<Personal>(
      `${this.URL_RH}personals/${id}`
    );
  }

  deletePersonal(id: number): Observable<Personal> {
    return this.httpClient.delete<Personal>(
      `${this.URL_RH}personals/${id}`
    );
  }

  createPersonal(personal: Personal): Observable<Personal> {
    return this.httpClient.post<Personal>(
      `${this.URL_RH}personals`,
      personal
    );
  }

  updatePersonal(personal: Personal): Observable<Personal> {
    return this.httpClient.post<Personal>(
      `${this.URL_RH}personals`,
      personal
    );
  }

}
