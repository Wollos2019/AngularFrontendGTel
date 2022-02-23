import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _url = 'http://localhost:8000/api/products';
  URL_COMMER = environment.URL_COMMER;

  constructor(private http:HttpClient) { }
  

  list () : Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.URL_COMMER}products`);
  }

  add(product:IProduct) : Observable<IProduct> {
    return this.http.post<IProduct>(`${this.URL_COMMER}products`, product);
  }

  sum() : Observable<any> {
    return this.http.get(this._url);
  }

  // update(product:IProduct) : Observable<IProduct> {
  //   return this.http.put<IProduct>('http://localhost:8000/api/products/'+product.id, product);
  // }

  update(product:IProduct) : Observable<IProduct> {
    return this.http.put<IProduct>(`${this._url}/${product.id}`,product);
  }

  delete(product:IProduct) : Observable<boolean>{
    return this.http.delete<boolean>(`${this._url}/${product.id}`);
  }

  search(x:string) : Observable<IProduct> {
    console.log('ici');
    console.log(x);
    return this.http.get<IProduct>('http://localhost:8000/api/products/search/'+x);
  }
  
}
