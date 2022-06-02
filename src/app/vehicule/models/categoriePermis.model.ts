import { IVehicule } from "./vehicule.model";

export interface ICategoriePermis{
    id?:string;
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
        public id?:string,
    public libelle?:string,
    public idVehicule?:string,

    public created_at?: Date,
    public update_at?: Date,
    public _method?:string,
    public pivot?:IPivot
    ){}
}


