import { ICategoriePermis } from "./categoriePermis.model";
import { IVehicule } from "./vehicule.model";

export interface ICategoriePermisVehicule{
    id:number;
    categorie_permis_id:string;
    vehiculeId:string;
    appends?:IAppends;
    created_at?: Date;
    update_at?: Date;
    _method?:string;

}
interface IAppends{
    CategoriePermi?:ICategoriePermis
    Vehicule?:IVehicule;
    
  }
export class CategoriePermisVehicule implements ICategoriePermisVehicule{
constructor(
    public id:number,
    public categorie_permis_id:string,
   public  vehiculeId:string,
    public created_at?: Date,
    public update_at?: Date,
   public  _method?:string,
){}
}