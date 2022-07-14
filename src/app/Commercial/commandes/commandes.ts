import { IProduct } from "src/app/product/product";
import { commandeDt } from "src/app/Commercial/commandes/commandeDetails";


export interface Icommande {
    id? : string;
    date? : Date;
    contenu? : string;
    appends? : IAppends;
    idClient? : string;
    nomClient? : string;
    tvaAccountable? : boolean;
    evaluated? : string;
    invoiced? :string;
    selected? : string;
    commandes_detail? : commandeDt[]
}

export class Commande implements Icommande {
    constructor(
        public id? : string,
        public date? : Date,
        public contenu? : string,
        public appends? : IAppends,
        public idClient? : string,
        public nomClient? : string,
        public tvaAccountable? : boolean,
        public evaluated? : string,
        public invoiced? :string,
        public selected? : string,
        public commandes_detail? : commandeDt[]
    ) {}
}

interface IAppends{
    products:commandeDt[];
}