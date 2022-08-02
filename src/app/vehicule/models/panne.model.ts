import { Fournisseur } from "src/app/Fournisseur/model/fournisseur.model";
import { NumericLiteral } from "typescript";
import { Vehicule } from "./vehicule.model";

export interface IPanne{
    id?:number;
    libellePanne?:string;
    descriptionPanne?:string;
    dateDebutPanne?:Date;
    dateFinPanne?:Date;
    coutMainOeuvre?:number;
    factureMainOeuvre?:number;
     facture?:number,
     coutPiece?:number,
    vehiculeId?:number;
    fournisseurId?:number;
    appends?:IAppends;
    created_at?: Date;
    update_at?: Date;
    _method?:string;
}
interface IAppends{
    
    fourniseur?:Fournisseur
    Vehicule?:Vehicule
  }


export class Panne implements IPanne{
    constructor(
        public id?:number,
        public libellePanne?:string,
        public descriptionPanne?:string,
        public dateDebutPanne?:Date,
        public dateFinPanne?:Date,
        public coutMainOeuvre?:number,
        public factureMainOeuvre?:number,
        public facture?:number,
        public coutPiece?:number,
        public vehiculeId?:number,
        public fournisseurId?:number,
        public appends?:IAppends,
        public factures?:any,
        public created_at?: Date,
        public update_at?: Date,
        public _method?:string,
    ){}
}