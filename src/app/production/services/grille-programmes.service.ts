import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrilleProgrammesService {

  URL_PRODUC = environment.URL_PRODUC;
  constructor(private http:HttpClient) { }

  list () : Observable<any> {
    return this.http.get<any>(`${this.URL_PRODUC}trancheHoraires`);
  }
}
