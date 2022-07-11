import { Assurance } from "src/app/assurence/model/assurance.model";
import { CategoriePermis } from "./categoriePermis.model";
import { Entretien } from "./entretien.model";
import { Panne } from "./panne.model";
import { PriseVehicule } from "./priseVehicule.model";

export interface IVehicule {
  id?:string;
  libelleVehicule?:string;
  numeroIdentifiant?:string;
  immatriculation?:string;
  carteGrise?:string;
  nombrePlace?:number;
  longueurVehicule?:number;
  dureeVie?:number;
  dateMiseCirculation?:Date;
  delaiAlerte?:number;
  append?:IAppends;
  created_at?: Date;
  update_at?: Date;
  _method?:string;

}
interface IAppends{
  panneVehicule?:Panne
  CategoryPermit?:CategoriePermis
  assurances?:Assurance
  priseVehicules?:PriseVehicule
  //url?:string;
  maintenanceVehicule?:Entretien

}

export class Vehicule implements IVehicule{
    constructor(
      public id?:string,
  public libelleVehicule?:string,
  public numeroIdentifiant?:string,
  public immatriculation?:string,
  public carteGrise?:string,
  public nombrePlace?:number,
  public longueurVehicule?:number,
  public dureeVie?:number,
  public dateMiseCirculation?:Date,
  public delaiAlerte?:number,
  public append?:IAppends,
  public created_at?: Date,
  public update_at?: Date,
  public _method?: string,
    ) {}
  
 
}
