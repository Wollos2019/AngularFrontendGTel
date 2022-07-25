import { IProduct } from "src/app/product/product";
import { commandeDt } from "src/app/Commercial/commandes/commandeDetails";
import { Client } from "src/app/client/client";


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
    commandes_detail? : commandeDt[];
    client? : Client;
    status? : STATUS;
    created_at? : Date;
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
        public commandes_detail? : commandeDt[],
        public client? : Client,
        public status? : STATUS,
        public created_at? : Date
    ) {}

    getStatus(status?: string): any {
        switch (status) {
          case 'ENABLE':
            return { value: 'Apuré', class: 'badge-success' };
            break;
          case 'DISABLE':
            return { value: 'Non apuré', class: 'badge-danger' };
            break;
          default:
            break;
        }
      }
}

export enum STATUS {
    ENABLE = 'ENABLE',
    DISABLE = 'DISABLE',
}

interface IAppends{
    products:commandeDt[];
}