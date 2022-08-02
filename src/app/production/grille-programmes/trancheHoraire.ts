import { Time } from "@angular/common"

export interface ITrancheHoraire {
    id ? : string,
    designation ? : string,
    occupied ? : string,
    key ? : string,
    idCommande ? : string,
    contenu ? : any,
    //contenu ? : string;
    heure_debut ? : Time
}

export class TrancheHoraire implements ITrancheHoraire {
    constructor(
    public id  : string,
    public designation  : string,
    public occupied  : string,
    public key  : string,
    public idCommande  : string,
    public contenu  : any,
    //public contenu  : string ,
    public heure_debut  : Time
    ) {}
}

interface contenus {
    x: string,
    y: string
}