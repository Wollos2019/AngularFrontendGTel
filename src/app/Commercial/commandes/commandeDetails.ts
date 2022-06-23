import { IProduct } from "src/app/product/product";

export interface IcommandeDt {
    id? : string;
    productName? : string;
    frequence? : any;
    idProduct? : string;
    idCommande? : string;
    prix? : number;
    appends? : IAppends;
}

export class commandeDt implements IcommandeDt {
    constructor(
      public id? : string,
      public productName?: string,
      public frequence?: any,
      public idProduct?: string,
      public idCommande?: string,
      public prix?: number,
      public appends?:IAppends
    ) {
    }
}

interface IAppends{
    productCommande?:number;
}