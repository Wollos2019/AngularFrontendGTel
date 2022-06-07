import {IVehicule} from '../../vehicule/models/vehicule.model'


export interface IAssurance {
  id?:string;
  numeroPoliceAssurance?:string;
  dateFinAssurance?:Date;
  scanAssurance?:string;
  dateDebutAssurance?:Date;
  idVehicule?:string;
  appends?:IAppends;
  created_at?: Date;
  update_at?: Date;
  _method?:string;

}

interface IAppends{
    vehicule?:IVehicule
    libelleVehicule?:string;
    immatriculation?:string;
    url?:string;
    compareDate?:string;
  }

export class Assurance implements IAssurance{
    constructor(
      public id?:string,
  public numeroPoliceAssurance?:string,
  public dateFinAssurance?:Date,
  public scanAssurance?:string,
  public dateDebutAssurance?:Date,
  public idVehicule?:string,
   public appends?:IAppends,
  public created_at?: Date,
  public update_at?: Date,
  public _method?: string,
    ) {}
  
 
}
