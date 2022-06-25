import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/product/product';
import { environment } from 'src/environments/environment';
import { commandeDt } from 'src/app/Commercial/commandes/commandeDetails';

@Injectable({
  providedIn: 'root'
})
export class CommandeDetaisService {
  private _url = 'http://localhost:8000/api/commercial/commandeDetails';
  URL_COMMER = environment.URL_COMMER;
  constructor(private http:HttpClient) { }

  list () : Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.URL_COMMER}commandeDetails`);
  }

  update (comDet:commandeDt) : Observable<commandeDt> {
    return this.http.put<commandeDt>(`${this._url}/${comDet.id}`,comDet)
  }

  add(comDet:commandeDt) : Observable<commandeDt> {
    return this.http.post<commandeDt>(`${this.URL_COMMER}commandeDetails`, comDet);
  }

}
