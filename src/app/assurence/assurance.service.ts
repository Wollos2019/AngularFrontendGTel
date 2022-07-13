import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Assurance } from './model/assurance.model';

@Injectable({
  providedIn: 'root'
})
export class AssuranceService {
  apiUrl=environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

   //GESTION DES ASSURANCE
/**
 * fonction pour recuper toutes les assurance
 * @param params 
 * @returns 
 */
 getAllAssurances(params=''):Observable<Assurance[]>{
  return this.httpClient.get<Assurance[]>(`${this.apiUrl}assurances/${params}`);
}
/**
 * fonction pour recuper une assurance
 * @param assurance 
 * @returns 
 */
getOneAssurance(assurance:Assurance):Observable<Assurance>{
  return this.httpClient.get<Assurance>(`${this.apiUrl}assurances/${assurance.id}`);
}
/**
 * fonction pour mettre a jour une assurance
 * @param assurance 
 * @returns 
 */
updateAssurance(assurance:Assurance):Observable<Assurance>{
  return this.httpClient.post<Assurance>(`${this.apiUrl}assurances/${assurance.id}`,assurance);
}
/**
 * fonction pour supprimer une assurance
 * @param assurance 
 * @returns 
 */
deleteAssurance(id:Number):Observable<Assurance>{
  return this.httpClient.delete<Assurance>(`${this.apiUrl}assurances/${id}`);
}

/**
 * fonction pour creer une assurance
 * @param assurance 
 * @returns 
 */
createAssurance(assurance:any):Observable<Assurance>{
  return this.httpClient.post<Assurance>(`${this.apiUrl}assurances`,assurance);
}


}
