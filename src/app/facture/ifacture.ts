export interface IFacture {
    id ? : number,
    nomClient ? : string
    prenClient ? : string
    idClient ? : string
    idCommande ? : string
    created_at ? : Date
    client ? : any
    commandes_detail ? : any
    coutSup ? : number
    tva ? : string
}

export class Facture implements IFacture {
    public id ? : number
    nomClient ? : string
    prenClient ? : string
    idClient  ? : string
    idCommande ? : string
    created_at ? : Date
    client ? : any
    commandes_detail ? : any
    coutSup ? : number
    tva ? : string
}
