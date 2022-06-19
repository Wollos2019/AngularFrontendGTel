import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Conducteur } from '../conducteur';

@Injectable({
  providedIn: 'root'
})
export class ConducteurService {

  URL_PRODUC = environment.URL_PRODUC;
  constructor(private http : HttpClient) { }

  list () : Observable<Conducteur[]> {
    return this.http.get<Conducteur[]>(`${this.URL_PRODUC}conducteurs`);
  }
}
