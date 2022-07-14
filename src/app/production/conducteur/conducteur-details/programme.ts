import { Time } from "@angular/common";

export interface IProgramme {
    heure_debut ? : Time,
    date ? : Date,
    duree ?  : number,
    denomination ? : string,
    description ? : string,
    idCommande ? : string,
    idProduit ? : string,
    conducteur_id ? : number
}

export class Programme implements IProgramme {
    constructor (
        public heure_debut ? : Time,
        public date ? : Date,
        public duree ? : number,
        public denomination ? : string,
        public description ? : string,
        public idCommande ? : string,
        public idProduit ? : string,
        public conducteur_id ? : number
    ) {}
}