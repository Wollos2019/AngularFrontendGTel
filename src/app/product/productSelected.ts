import { IProduct } from "./product";

export interface IproductSelected  {
    productName ? : string,
    checked ? : boolean,
    duree ?: number,
    idCommande ? : string,
    idProduct ? : string,
    heure_debut ? : string,
    frequence ? : any,
    description  : string
}

export class ProductSelected implements IproductSelected {
    constructor(
    //public id : string,
    public productName : string,
    public description  : string,
    public price ? : string,
    public checked ? : boolean,
    public duree ?: number,
    public idCommande ? : string,
    public idProduct ? : string,
    public heure_debut ? : string,
    public frequence ? : any
    ) {}
}