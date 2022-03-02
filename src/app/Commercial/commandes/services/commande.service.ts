import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/product/product';
import { IproductSelected } from 'src/app/product/productSelected';
import { environment } from 'src/environments/environment';
import { Icommande } from '../commandes';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  
  URL_COMMER = environment.URL_COMMER;
  constructor(private http:HttpClient) { }

  list () : Observable<any> {
    return this.http.get<any>(`${this.URL_COMMER}commandes`);
  }

  add(commande:Icommande) : Observable<Icommande> {
    return this.http.post<Icommande>(`${this.URL_COMMER}commandes`, commande);
  }

  addProduct(product:IproductSelected) : Observable<IproductSelected> {
    return this.http.post<IproductSelected>(`${this.URL_COMMER}commandeDetails`, product);
  }
}
