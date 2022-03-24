import { IProduct } from "src/app/product/product";

export interface Icommande {
    id : string;
    date : Date;
    contenu : string;
    appends : IAppends;
    idClient : number;
    nomClient : string;
    tvaAccountable : boolean;
}

interface IAppends{
    products:IProduct;
}