export interface IProgramme {
    heure_debut ? : string,
    date ? : string,
    duree ?  : string,
    denomination ? : string,
    description ? : string,
    idCommande ? : number,
    idProduit ? : number,
    conducteur_id ? : number
}

export class Programme implements IProgramme {
    constructor (
        public heure_debut ? : string,
        public date ? : string,
        public duree ? : string,
        public denomination ? : string,
        public description ? : string,
        public idCommande ? : number,
        public idProduit ? : number,
        public conducteur_id ? : number
    ) {}
}