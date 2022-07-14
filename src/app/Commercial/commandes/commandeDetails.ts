import { Time } from "@angular/common";
import { IProduct } from "src/app/product/product";

export interface IcommandeDt {
    id? : string;
    productName? : string;
    date_debut ? : Date;
    heure_debut ? : Time;
    duree ? : number;
    frequence? : any;
    idProduct? : string;
    idCommande? : string;
    prix? : number;
    appends? : IAppends;
    description? : string;
}

export class commandeDt implements IcommandeDt {
    constructor(
      public id? : string,
      public productName?: string,
      public date_debut?: Date,
      public heure_debut? : Time,
      public duree? :number,
      public frequence?: any,
      public idProduct?: string,
      public idCommande?: string,
      public prix?: number,
      public appends?: IAppends,
      public description?: string
    ) {
    }
}

interface IAppends{
    productCommande?:number;
}