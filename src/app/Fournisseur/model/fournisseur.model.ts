import { IPanne } from "src/app/vehicule/models/panne.model";


export interface IFournisseur {
    id?:number;
    libelleFournisseur?:string;
    telephone1?:string;
    telephone2?:string;
    addressFournisseur?:string;
    appends?:IAppends
    created_at?: Date;
    update_at?: Date;
    _method?:string;
  
  }

  interface IAppends{
    pannes?:IPanne
  }
  export class Fournisseur implements IFournisseur{
    constructor(
  public id?:number,
  public libelleFournisseur?:string,
  public telephone1?:string,
  public telephone2?:string,
  public addressFournisseur?:string,
  public appends?:IAppends,
  public created_at?: Date,
  public update_at?: Date,
  public _method?: string,
    ) {}
  
 
}