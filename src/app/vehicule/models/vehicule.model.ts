import { Assurance, IAssurance } from "src/app/assurence/model/assurance.model";
import { CategoriePermis } from "./categoriePermis.model";
import { Entretien } from "./entretien.model";
import { Panne } from "./panne.model";
import { PriseVehicule } from "./priseVehicule.model";

export interface IVehicule {
  id?:number;
  libelleVehicule?:string;
  numeroIdentifiant?:string;
  immatriculation?:string;
  marque?:string;
  carburant?:TYPECARBURANT;
  carteGrise?:string;
  nombrePlace?:number;
  longueurVehicule?:number;
  dureeVie?:number;
  dateMiseCirculation?:Date;
  delaiAlerte?:number;
  appends?:IAppends;
  created_at?: Date;
  update_at?: Date;
  _method?:string;

}
interface IAppends{
  panneVehicule?:Panne[]
  CategoryPermit?:CategoriePermis
  assurances?:IAssurance[]
  priseVehicules?:PriseVehicule
  //url?:string;
  maintenanceVehicule?:Entretien[]
  totalVehicules?:Number

}

export class Vehicule implements IVehicule{
    constructor(
      public id?:number,
  public libelleVehicule?:string,
  public numeroIdentifiant?:string,
  public immatriculation?:string,
  public carteGrise?:string,
  public nombrePlace?:number,
  public marque?:string,
  public carburant?:TYPECARBURANT,
  public longueurVehicule?:number,
  public dureeVie?:number,
  public dateMiseCirculation?:Date,
  public delaiAlerte?:number,
  public appends?:IAppends,
  public created_at?: Date,
  public update_at?: Date,
  public _method?: string,
    ) {}
  
 
}

export enum TYPECARBURANT {
  ESSENCE = 'ESSENCE',
  GAZOLE = 'GAZOLE',
  DIHYDROGENE = 'DIHYDROGENE',
  GPL = 'GPL',
  KEROSENE = 'KEROSENE',


}
