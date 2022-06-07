import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fournisseur } from './model/fournisseur.model';


@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  apiUrl=environment.apiUrl;
  constructor(private httpClient:HttpClient,
             ) { }

 //GESTION DES FOURNISSEUR
/**
 * fonction pour recuper toutes les Fournisseur
 * @param params 
 * @returns 
 */
 getAllFournisseurs(params=''):Observable<Fournisseur[]>{
  return this.httpClient.get<Fournisseur[]>(`${this.apiUrl}vendors/${params}`);
}
/**
 * fonction pour recuper une Fournisseur
 * @param vendors 
 * @returns 
 */
getOneFournisseur(vendors:Fournisseur):Observable<Fournisseur>{
  return this.httpClient.get<Fournisseur>(`${this.apiUrl}vendors/${vendors.id}`);
}
/**
 * fonction pour mettre a jour une Fournisseur
 * @param vendors 
 * @returns 
 */
updateFournisseur(vendors:Fournisseur):Observable<Fournisseur>{
  return this.httpClient.post<Fournisseur>(`${this.apiUrl}vendors/${vendors.id}`,vendors);
}
/**
 * fonction pour supprimer une Fournisseur
 * @param vendors 
 * @returns 
 */
deleteFournisseur(vendors:Fournisseur):Observable<Fournisseur>{
  return this.httpClient.delete<Fournisseur>(`${this.apiUrl}vendors/${vendors.id}`);
}

/**
 * fonction pour creer une Fournisseur
 * @param vendors 
 * @returns 
 */
createFournisseur(vendors:any):Observable<Fournisseur>{
  return this.httpClient.post<Fournisseur>(`${this.apiUrl}vendors`,vendors);
}


}


