import { IPersonal } from "src/app/rh/models/personal.model";
import { ICategoriePermis } from "./categoriePermis.model";


export interface IPermis{
    id?:string;
    numeroPermis?:string;
    dateAcquisition?:Date;
    userId?:string;
    category_permit_id?:string;
    numeroDossierPermis?:string;
    typeCategoriePermis?:string;
    dateDebutPermis?:Date;
    dateFinPermis?:Date;
    permis_id?:string;
    appends?:IAppends;
    // pivot?:Pivot,
    created_at?: Date;
    update_at?: Date;
    _method?:string;

}
interface IAppends{
    
    user?:IPersonal
    categoriePermit?:ICategoriePermis[]
    expireCategories?:any
    compareDate?:string;
    
  }

//   export interface Pivot{
  
//     dateDebutPermis: Date;
//     dateFinPermis: Date
//     numeroDossierPermis:string,
     
//     typeCategoriePermis:string, 
//   }
export class Permis implements IPermis{
    constructor(
        public id?:string,
        public numeroPermis?:string,
        public dateAcquisition?:Date,
        public userId?:string,
        public category_permit_id?:string,
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