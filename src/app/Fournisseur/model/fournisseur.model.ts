

export interface IFournisseur {
    id?:string;
    libelleFournisseur?:string;
    telephone1?:string;
    telephone2?:string;
    addressFournisseur?:string;
    created_at?: Date;
    update_at?: Date;
    _method?:string;
  
  }
  export class Fournisseur implements IFournisseur{
    constructor(
  public id?:string,
  public libelleFournisseur?:string,
  public telephone1?:string,
  public telephone2?:string,
  public addressFournisseur?:string,
  public created_at?: Date,
  public update_at?: Date,
  public _method?: string,
    ) {}
  
 
}