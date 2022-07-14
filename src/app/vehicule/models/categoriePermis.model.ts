import { IVehicule } from "./vehicule.model";

export interface ICategoriePermis{
    id?:number;
    libelle?:string;
    appends?:IAppends;
    pivot?:IPivot;
    created_at?: Date;
    update_at?: Date;

}

interface IAppends{
   vehicule:IVehicule,
   
   
   
  }
 

   interface IPivot{
    dateDebutPermis?: Date;
    dateFinPermis?: Date;
    numeroDossierPermis?:string;
    typeCategoriePermis?:string;
    category_permit_id?:number;
  }

export class CategoriePermis implements ICategoriePermis{
    constructor(
        public id?:number,
    public libelle?:string,
    public idVehicule?:string,

    public created_at?: Date,
    public update_at?: Date,
    public _method?:string,
    public pivot?:IPivot
    ){}
}


