import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PriseVehicule } from './models/priseVehicule.model';
import { Vehicule } from './models/vehicule.model';

@Injectable({
  providedIn: 'root'
})
export class VehiculeServiceService {
  URL_VEHICULE= environment.URL_VEHICULE;
  URL_PRISEVEHICULE=environment.URL_PRISEVEHICULE;
  constructor(private httpClient:HttpClient) { }

  //GESTION DES VEHICULES
/**
 * fonction pour recuper toutes les vehicules
 * @param params 
 * @returns 
 */
  getAllVehicules(params=''):Observable<Vehicule[]>{
    return this.httpClient.get<Vehicule[]>(`${this.URL_VEHICULE}vehicules/${params}`);
  }

  getOneVehicule(vehicule:Vehicule):Observable<Vehicule>{
    return this.httpClient.get<Vehicule>(`${this.URL_VEHICULE}vehicules/${vehicule.id}`);
  }

  updateVehicule(vehicule:Vehicule):Observable<Vehicule>{
    return this.httpClient.post<Vehicule>(`${this.URL_VEHICULE}vehicules/${vehicule.id}`,vehicule);
  }

  deleteVehicule(vehicule:Vehicule):Observable<Vehicule>{
    return this.httpClient.delete<Vehicule>(`${this.URL_VEHICULE}vehicules/${vehicule.id}`);
  }

  createVehicule(vehicule:Vehicule):Observable<Vehicule>{
    return this.httpClient.post<Vehicule>(`${this.URL_VEHICULE}vehicules`,vehicule);
  }



   //GESTION PRISE VEHICULES
/**
 * 
 * @param params 
 * @returns 
 */


 getAllPriseVehicules(params=''):Observable<PriseVehicule[]>{
  return this.httpClient.get<PriseVehicule[]>(`${this.URL_VEHICULE}prise_vehicules/${params}`);
}

getOnePriseVehicule(prisevehicule:PriseVehicule):Observable<PriseVehicule>{
  return this.httpClient.get<PriseVehicule>(`${this.URL_VEHICULE}prise_vehicules/${prisevehicule.id}`);
}

updatePriseVehicule(prisevehicule:PriseVehicule):Observable<PriseVehicule>{
  return this.httpClient.post<PriseVehicule>(`${this.URL_VEHICULE}prise_vehicules/${prisevehicule.id}`,prisevehicule);
}

deletePriseVehicule(prisevehicule:PriseVehicule):Observable<PriseVehicule>{
  return this.httpClient.delete<PriseVehicule>(`${this.URL_VEHICULE}prise_vehicules/${prisevehicule.id}`);
}

createPriseVehicule(prisevehicule:Vehicule):Observable<PriseVehicule>{
  return this.httpClient.post<PriseVehicule>(`${this.URL_VEHICULE}prise_vehicules`,prisevehicule);
}


}
