export interface IFacture {
    id ? : number;
    nomClient ? : string;
    idClient ? : string;
    idCommande ? : string;
}

export class Facture implements IFacture {
    public id ? : number;
    nomClient ? : string;
    idClient  ? : string;
    idCommande ? : string;
}
