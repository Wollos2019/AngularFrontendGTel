import { IProduct } from "./product";

export interface IproductSelected  {
    productName ? : string,
    checked ? : boolean,
    quantity ?: number,
    idCommande ? : string,
    idProduct ? : string,
    heure_debut ? : string,
    heure_fin ? : string,
    description  : string
}

export class ProductSelected implements IproductSelected {
    constructor(
    //public id : string,
    public productName : string,
    public description  : string,
    public price ? : string,
    public checked ? : boolean,
    public quantity ?: number,
    public idCommande ? : string,
    public idProduct ? : string,
    public heure_debut ? : string,
    public heure_fin ? : string
    ) {}
}