import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoriePermis } from './models/categoriePermis.model';
import { Entretien, IEntretien } from './models/entretien.model';
import { Panne } from './models/panne.model';
import { IPermis, Permis } from './models/permis.model';

import { PriseVehicule } from './models/priseVehicule.model';
import { IStatistiqueVehicule } from './models/statistiqueVehicule.model';
import { ITypeEntretien, TypeEntretien } from './models/typeEntretien.model';
import { UnitMesure } from './models/unitMesure.model';
import { IVehicule, Vehicule } from './models/vehicule.model';

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
    return this.httpClient.get<Vehicule[]>(`${this.apiUrl}vehicules?${params}`);
  }

  getOneVehicule(vehiculeId:number):Observable<Vehicule>{
    return this.httpClient.get<Vehicule>(`${this.apiUrl}vehicules/${vehiculeId}`);
  }

  updateVehicule(vehicule:Vehicule):Observable<Vehicule>{
    return this.httpClient.post<Vehicule>(`${this.apiUrl}vehicules/${vehicule.id}`,vehicule);
  }

  deleteVehicule(id:Number):Observable<Vehicule>{
    return this.httpClient.delete<Vehicule>(`${this.apiUrl}vehicules/${id}`);
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
  return this.httpClient.get<PriseVehicule[]>(`${this.apiUrl}prise_vehicules?${params}`);
}

getOnePriseVehicule(prisevehicule:PriseVehicule):Observable<PriseVehicule>{
  return this.httpClient.get<PriseVehicule>(`${this.apiUrl}prise_vehicules/${prisevehicule.id}`);
}

updatePriseVehicule(prisevehicule:PriseVehicule):Observable<PriseVehicule>{
  return this.httpClient.post<PriseVehicule>(`${this.apiUrl}prise_vehicules/${prisevehicule.id}`,prisevehicule);
}

deletePriseVehicule(id:Number):Observable<PriseVehicule>{
  return this.httpClient.delete<PriseVehicule>(`${this.apiUrl}prise_vehicules/${id}`);
}

createPriseVehicule(prisevehicule:PriseVehicule):Observable<PriseVehicule>{
  return this.httpClient.post<PriseVehicule>(`${this.apiUrl}prise_vehicules`,prisevehicule);
}




   //GESTION PERMIS
/**
 *
 * @param params
 * @returns
 */


 getAllPermis(params=''):Observable<Permis[]>{
  return this.httpClient.get<Permis[]>(`${this.apiUrl}permits?${params}`);
}

getOnePermi(id:number):Observable<Permis>{
  return this.httpClient.get<Permis>(`${this.apiUrl}permits/${id}`);
}

updatePermi(permi:Permis):Observable<Permis>{
  return this.httpClient.post<Permis>(`${this.apiUrl}permits/${permi.id}`,permi);
}

deletePermi(id:Number):Observable<Permis>{
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
  return this.httpClient.get<CategoriePermis[]>(`${this.apiUrl}category_permits?${params}`);
}

getOneCategoriePermi(Catpermi:CategoriePermis):Observable<CategoriePermis>{
  return this.httpClient.get<CategoriePermis>(`${this.apiUrl}category_permits/${Catpermi.id}`);
}

updateCategoriePermi(Catpermi:CategoriePermis):Observable<CategoriePermis>{
  return this.httpClient.post<CategoriePermis>(`${this.apiUrl}category_permits/${Catpermi.id}`,Catpermi);
}

deleteCategoriePermi(id:Number):Observable<CategoriePermis>{
  return this.httpClient.delete<CategoriePermis>(`${this.apiUrl}category_permits/${id}`);
}

createCategoriePermi(Catpermi:CategoriePermis):Observable<CategoriePermis>{
  return this.httpClient.post<CategoriePermis>(`${this.apiUrl}category_permits`,Catpermi);
}



   //GESTION DES PANNE
/**
 *
 * @param params
 * @returns
 */


 getAllPannes(params=''):Observable<Panne[]>{
  return this.httpClient.get<Panne[]>(`${this.apiUrl}pannes?${params}`);
}

getOnePanne(id:number):Observable<Panne>{
  return this.httpClient.get<Panne>(`${this.apiUrl}pannes/${id}`);
}

updatePanne(panne:Panne):Observable<Panne>{
  return this.httpClient.post<Panne>(`${this.apiUrl}pannes/${panne.id}`,panne);
}

deletePanne(id:Number):Observable<Panne>{
  return this.httpClient.delete<Panne>(`${this.apiUrl}pannes/${id}`);
}

createPanne(panne:Panne):Observable<Panne>{
  return this.httpClient.post<Panne>(`${this.apiUrl}pannes`,panne);
}



   //GESTION DES UNITY DE MESURES
/**
 * 
 * @param params 
 * @returns 
 */


 getAllUniteMesures(params=''):Observable<UnitMesure[]>{
  return this.httpClient.get<UnitMesure[]>(`${this.apiUrl}unit_mesures?${params}`);
}


deleteUniteMesure(id:Number):Observable<UnitMesure>{
  return this.httpClient.delete<UnitMesure>(`${this.apiUrl}unit_mesures/${id}`);
}

createUniteMesure(unitemesure:UnitMesure):Observable<UnitMesure>{
  return this.httpClient.post<UnitMesure>(`${this.apiUrl}unit_mesures`,unitemesure);
}



 //GESTION DES TYPES ENTRETIENS
/**
 * 
 * @param params 
 * @returns 
 */


 getAllTypeEntretiens(params=''):Observable<TypeEntretien[]>{
  return this.httpClient.get<TypeEntretien[]>(`${this.apiUrl}type_maintenances?${params}`);
}

deleteTypeEntretien(id:Number):Observable<ITypeEntretien>{
  return this.httpClient.delete<ITypeEntretien>(`${this.apiUrl}type_maintenances/${id}`);
}

createTypeEntretien(typeEntretien:TypeEntretien):Observable<TypeEntretien>{
  return this.httpClient.post<TypeEntretien>(`${this.apiUrl}type_maintenances`,typeEntretien);
}

//GESTION DES ENTRETIENS
/**
 * 
 * @param params 
 * @returns 
 */


 getAllEntretiens(params=''):Observable<IEntretien[]>{
  return this.httpClient.get<IEntretien[]>(`${this.apiUrl}maintenance_vehicules?${params}`);
}

getOneEntretien(id:number):Observable<IEntretien>{
  return this.httpClient.get<IEntretien>(`${this.apiUrl}maintenance_vehicules/${id}`);
}

updateEntretien(entretien:Entretien):Observable<Entretien>{
  return this.httpClient.post<Entretien>(`${this.apiUrl}maintenance_vehicules/${entretien.id}`,entretien);
}

deleteEntretien(id:Number):Observable<Entretien>{
  return this.httpClient.delete<Entretien>(`${this.apiUrl}maintenance_vehicules/${id}`);
}

createEntretien(entretien:IEntretien):Observable<IEntretien>{
  return this.httpClient.post<IEntretien>(`${this.apiUrl}maintenance_vehicules`,entretien);
}

//GESTION DES STATISTIQUE
/**
 * 
 * @param params 
 * @returns 
 */
getStatistiqueVehicule(): Observable<IStatistiqueVehicule> {
  return this.httpClient.get<IStatistiqueVehicule>(`${this.apiUrl}statistical`);
}

}
