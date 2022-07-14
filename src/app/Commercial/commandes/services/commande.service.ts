import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/product/product';
import { IproductSelected } from 'src/app/product/productSelected';
import { environment } from 'src/environments/environment';
import { commandeDt } from 'src/app/Commercial/commandes/commandeDetails';
import { Commande, Icommande } from 'src/app/Commercial/commandes/commandes';


@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  
  URL_COMMER = environment.URL_COMMER;
  constructor(private http:HttpClient) { }

  list (params='') : Observable<any> {
    return this.http.get<any>(`${this.URL_COMMER}commandes?${params}`);
  }

  add(commande:Commande) : Observable<Commande> {
    return this.http.post<Commande>(`${this.URL_COMMER}commandes`, commande);
  }

  addProduct(product:IproductSelected) : Observable<IproductSelected> {
    return this.http.post<IproductSelected>(`${this.URL_COMMER}commandeDetails`, product);
  }

  searchDet(x?:string) {
    return this.http.get<commandeDt[]>(`${this.URL_COMMER}searchDet/`+x);
  }

  somme() {
    return this.http.get<string>(`${this.URL_COMMER}commandeDetails/somme`);
  }

  update(commande:Commande) : Observable<Commande> {
    return this.http.put<Commande>(`${this.URL_COMMER}commandes/${commande.id}`,commande);
  }

}
