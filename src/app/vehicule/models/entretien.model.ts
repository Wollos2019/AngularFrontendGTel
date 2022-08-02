import { IFournisseur } from "src/app/Fournisseur/model/fournisseur.model";
import { ITypeEntretien } from "./typeEntretien.model";
import { IUnitMesure } from "./unitMesure.model";
import { IVehicule } from "./vehicule.model";

export interface IEntretien{
    id?:number;
    dateEntretien?:Date;
    cout?:number;
    nextDateEntretien?:Date;
    kilometrageEntretien?:number;
    kilometrageNextEntretien?:number;
    quantiteTypeEntretien?:number;
    vehiculeId?:number;
    fournisseurId?:number;
    typeEntretienId?:number;
    unitMesureId?:number;
     appends?:IAppends,
   created_at?: Date,
   update_at?: Date,
   _method?: string,

}
interface IAppends{
    vehicules?:IVehicule;
    fournisseur?:IFournisseur;
    typeMaintenancevehicule?:ITypeEntretien;
    uniteMesure?:IUnitMesure

}

export class Entretien implements IEntretien {
    constructor(
        public id?:number,
        public dateEntretien?:Date,
        public cout?:number,
        public nextDateEntretien?:Date,
        public kilometrageEntretien?:number,
        public kilometrageNextEntretien?:number,
        public quantiteTypeEntretien?:number,
        public vehiculeId?:number,
        public fournisseurId?:number,
        public appends?:IAppends,
        public typeEntretienId?:number,
        public unitMesureId?:number,
        public created_at?: Date,
        public update_at?: Date,
        public _method?: string,

    
        
    ){}
}