import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Programme } from '../programme';

@Injectable({
  providedIn: 'root'
})
export class ConducteurDetailsService {

  URL_PRODUC = environment.URL_PRODUC;
  constructor(private http:HttpClient) { }

  list () : Observable<any> {
    return this.http.get<any>(`${this.URL_PRODUC}conducteurs`);
  }

  add(programme:Programme) : Observable<Programme> {
    return this.http.post<Programme>(`${this.URL_PRODUC}programmes`, programme);
  }
}
