
export interface IVehicule {
  id?:string;
  libelleVehicule?:string;
  numeroIdentifiant?:string;
  immatriculation?:string;
  carteGrise?:string;
  nombrePlace?:number;
  longueurVehicule?:number;
  dureeVie?:number;
  dateMiseCirculation?:Date;
  delaiAlerte?:number;
  created_at?: Date;
  update_at?: Date;
  _method?:string;

}

export class Vehicule implements IVehicule{
    constructor(
      public id?:string,
  public libelleVehicule?:string,
  public numeroIdentifiant?:string,
  public immatriculation?:string,
  public carteGrise?:string,
  public nombrePlace?:number,
  public longueurVehicule?:number,
  public dureeVie?:number,
  public dateMiseCirculation?:Date,
  public delaiAlerte?:number,
  public created_at?: Date,
  public update_at?: Date,
  public _method?: string,
    ) {}
  
 
}
