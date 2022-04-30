import { Time } from "@angular/common";
import { IVehicule } from "./vehicule.model";

export interface IPriseVehicule {
    id?:string;
    objetPriseVehicule?:string;
    datePriseVehicule?:Date;
    heurePriseVehicule?:Time;
    idVehicule?:string;
    appends?:IAppends;
    created_at?: Date;
    update_at?: Date;
    _method?:string;
  
  }

  interface IAppends{
    vehicule?:IVehicule
    libelleVehicule?:string;
    nombrePlace?:number;
    immatriculation?:string;
  }
  
  export class PriseVehicule implements IPriseVehicule{
      constructor(
    public id?:string,
    public objetPriseVehicule?:string,
    public datePriseVehicule?:Date,
    public heurePriseVehicule?:Time,
    public idVehicule?:string,
    public appends?:IAppends,
    public created_at?: Date,
    public update_at?: Date,
    public _method?: string,
      ) {}
    
   
  }
  