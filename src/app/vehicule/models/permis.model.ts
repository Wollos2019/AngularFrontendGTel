import { IPersonal } from "src/app/rh/models/personal.model";


export interface IPermis{
    id?:string;
    numeroPermis?:string;
    dateAcquisition?:Date;
    userId?:string;
    categorie_permis_id?:string;
    numeroDossierPermis?:string;
    typeCategoriePermis?:string;
    dateDebutPermis?:Date;
    dateFinPermis?:Date;
    permis_id?:string;
    appends?:IAppends;
    created_at?: Date;
    update_at?: Date;
    _method?:string;

}
interface IAppends{
    
    user?:IPersonal
    
  }

  export interface Pivot{
   
  }
export class Permis implements IPermis{
    constructor(
        public id?:string,
        public numeroPermis?:string,
        public dateAcquisition?:Date,
        public userId?:string,
        public categorie_permis_id?:string,
        public  appends?:IAppends,
        public numeroDossierPermis?:string,
        public typeCategoriePermis?:string,
        public categories?:any,
        public dateDebutPermis?:Date,
        public dateFinPermis?:Date,
         public permis_id?:string,
        public created_at?: Date,
        public update_at?: Date,
        public _method?:string,
    ){}
}