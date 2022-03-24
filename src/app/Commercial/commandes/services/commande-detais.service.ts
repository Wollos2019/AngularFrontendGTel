import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/product/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandeDetaisService {
  URL_COMMER = environment.URL_COMMER;
  constructor(private http:HttpClient) { }

  list () : Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.URL_COMMER}commandeDetails`);
  }
}