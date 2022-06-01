import { Time } from "@angular/common";
import { timestamp, Timestamp } from "rxjs";
import { Commande } from "src/app/commercial/commandes/commandes";

export class TrancheHoraire {
    constructor(
        public id : string,
        public designation : string,
        public occupied : string,
        public key : string,
        public idCommande : string,
        public contenu : (contenus[] & string),
        public heure_debut : Time 
    ) {}
}

interface contenus {
    x: string,
    y: string
}
