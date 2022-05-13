import { IVehicule } from "./vehicule.model";

export interface ICategoriePermis{
    id?:string;
    libelle?:string;
    appends?:IAppends;
    created_at?: Date;
    update_at?: Date;
    _method?:string;

}

interface IAppends{
   vehicule:IVehicule,
   
    
  }

export class CategoriePermis implements ICategoriePermis{
    constructor(
        public id?:string,
    public libelle?:string,
    public idVehicule?:string,
    public created_at?: Date,
    public update_at?: Date,
    public _method?:string,
    ){}
}