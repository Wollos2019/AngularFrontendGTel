import { IProduct } from "./product";

export interface IproductSelected extends IProduct {
    checked ? : boolean,
    quantity ?: number,
    idCommande ? : string,
    idProduct ? : number
}