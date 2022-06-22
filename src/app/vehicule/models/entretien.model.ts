
export interface IEntretien{
    id?:string;
    dateEntretien?:Date;
    cout?:number;
    nextDateEntretien?:Date;
    kilometrageEntretien?:number;
    kilometrageNextEntretien?:number;
    quantiteTypeEntretien?:number;
    vehiculeId?:number;
    fournisseurId?:number;
    typeEntretienId?:number;

}

export class Entretien implements IEntretien {
    constructor(
        public id?:string,
        public dateEntretien?:Date,
        public cout?:number,
        public nextDateEntretien?:Date,
        public kilometrageEntretien?:number,
        public kilometrageNextEntretien?:number,
        public quantiteTypeEntretien?:number,
        public vehiculeId?:number,
        public fournisseurId?:number,
        public typeEntretienId?:number,
    
        
    ){}
}