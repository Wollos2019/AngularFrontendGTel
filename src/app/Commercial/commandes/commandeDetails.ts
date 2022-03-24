import { IProduct } from "src/app/product/product";

export interface IcommandeDt {
    productName : String;
    quantity : number;
    idProduct : String;
    idCommande : String;
    appends? : IAppends;
}

interface IAppends{
    productCommande?:number;
}