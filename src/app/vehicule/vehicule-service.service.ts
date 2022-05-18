import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoriePermis } from './models/categoriePermis.model';
import { Permis } from './models/permis.model';

import { PriseVehicule } from './models/priseVehicule.model';
import { Vehicule } from './models/vehicule.model';

@Injectable({
  providedIn: 'root'
})
export class VehiculeServiceService {
  apiUrl=environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  //GESTION DES VEHICULES
/**
 * fonction pour recuper toutes les vehicules
 * @param params 
 * @returns 
 */
  getAllVehicules(params=''):Observable<Vehicule[]>{
    return this.httpClient.get<Vehicule[]>(`${this.apiUrl}vehicules/${params}`);
  }

  getOneVehicule(vehicule:Vehicule):Observable<Vehicule>{
    return this.httpClient.get<Vehicule>(`${this.apiUrl}vehicules/${vehicule.id}`);
  }

  updateVehicule(vehicule:Vehicule):Observable<Vehicule>{
    return this.httpClient.post<Vehicule>(`${this.apiUrl}vehicules/${vehicule.id}`,vehicule);
  }

  deleteVehicule(vehicule:Vehicule):Observable<Vehicule>{
    return this.httpClient.delete<Vehicule>(`${this.apiUrl}vehicules/${vehicule.id}`);
  }

  createVehicule(vehicule:Vehicule):Observable<Vehicule>{
    return this.httpClient.post<Vehicule>(`${this.apiUrl}vehicules`,vehicule);
  }



   //GESTION PRISE VEHICULES
/**
 * 
 * @param params 
 * @returns 
 */


 getAllPriseVehicules(params=''):Observable<PriseVehicule[]>{
  return this.httpClient.get<PriseVehicule[]>(`${this.apiUrl}prise_vehicules/${params}`);
}

getOnePriseVehicule(prisevehicule:PriseVehicule):Observable<PriseVehicule>{
  return this.httpClient.get<PriseVehicule>(`${this.apiUrl}prise_vehicules/${prisevehicule.id}`);
}

updatePriseVehicule(prisevehicule:PriseVehicule):Observable<PriseVehicule>{
  return this.httpClient.post<PriseVehicule>(`${this.apiUrl}prise_vehicules/${prisevehicule.id}`,prisevehicule);
}

deletePriseVehicule(prisevehicule:PriseVehicule):Observable<PriseVehicule>{
  return this.httpClient.delete<PriseVehicule>(`${this.apiUrl}prise_vehicules/${prisevehicule.id}`);
}

createPriseVehicule(prisevehicule:Vehicule):Observable<PriseVehicule>{
  return this.httpClient.post<PriseVehicule>(`${this.apiUrl}prise_vehicules`,prisevehicule);
}




   //GESTION PERMIS 
/**
 * 
 * @param params 
 * @returns 
 */


 getAllPermis(params=''):Observable<Permis[]>{
  return this.httpClient.get<Permis[]>(`${this.apiUrl}permits/${params}`);
}

getOnePermi(id:number):Observable<Permis>{
  return this.httpClient.get<Permis>(`${this.apiUrl}permits/${id}`);
}

updatePermi(permi:Permis):Observable<Permis>{
  return this.httpClient.post<Permis>(`${this.apiUrl}permits/${permi.id}`,permi);
}

deletePermi(id:number):Observable<Permis>{
  return this.httpClient.delete<Permis>(`${this.apiUrl}permits/${id}`);
}

createPermi(permi:Permis):Observable<Permis>{
  return this.httpClient.post<Permis>(`${this.apiUrl}permits`,permi);
}





   //GESTION CATEGORIE-PERMIS 
/**
 * 
 * @param params 
 * @returns 
 */


 getAllCategoriePermis(params=''):Observable<CategoriePermis[]>{
  return this.httpClient.get<CategoriePermis[]>(`${this.apiUrl}category_permits/${params}`);
}

getOneCategoriePermi(Catpermi:CategoriePermis):Observable<CategoriePermis>{
  return this.httpClient.get<CategoriePermis>(`${this.apiUrl}category_permits/${Catpermi.id}`);
}

updateCategoriePermi(Catpermi:CategoriePermis):Observable<CategoriePermis>{
  return this.httpClient.post<CategoriePermis>(`${this.apiUrl}category_permits/${Catpermi.id}`,Catpermi);
}

deleteCategoriePermi(Catpermi:CategoriePermis):Observable<CategoriePermis>{
  return this.httpClient.delete<CategoriePermis>(`${this.apiUrl}category_permits/${Catpermi.id}`);
}

createCategoriePermi(Catpermi:CategoriePermis):Observable<CategoriePermis>{
  return this.httpClient.post<CategoriePermis>(`${this.apiUrl}category_permits`,Catpermi);
}


}