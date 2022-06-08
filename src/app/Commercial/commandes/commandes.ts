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
        public evaluated? : string
    ) {}
}

interface IAppends{
    products:commandeDt[];
}