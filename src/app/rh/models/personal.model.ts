import { IDepartment } from "src/app/config/model/department.model";

export interface IPersonal {
   id?: number;
     lastname?: string;
     firstname?: string;
     email?: string;
     cni?: string;
     gender?: GENDER;
     cnps?: string;
     numberChild?: string;
     phone?: string;
     address?: string;
     birthday?: string;
     countryId?: number;
     town?: string;
     status?:STATUS;
     created_at?: Date;
     update_at?: Date;
     civilityId?:number;
     isAdmin?:boolean;
     courriel?:string;
     marital?:MARITAL;
     password?:string;
     salary?:number;
     contract?:CONTRACT;
     fonction?:string;
     dateStart?:Date;
     dateEnd?:Date;
     departmentId?:number;
     appends?:IAppends;
     placeBirth?:string;
    country?:number;
    _method?:string
    

}

export class Personal implements IPersonal {
  constructor(
    public id?: number,
    public lastname?: string,
    public firstname?: string,
    public email?: string,
    public cni?: string,
    public gender?: GENDER,
    public cnps?: string,
    public numberChild?: string,
    public phone?: string,
    public address?: string,
    public birthday?: string,
    public countryId?: number,
    public town?: string,
    public civilityId?:number,
    public status?:STATUS,
    public created_at?: Date,
    public update_at?: Date,
    public isAdmin?:boolean,
    public courriel?:string,
    public marital?:MARITAL,
    public salary?:number,
    public contract?:CONTRACT,
    public fonction?:string,
    public dateStart?:Date,
    public dateEnd?:Date,
    public password?:string,
    public departmentId?:number,
    public appends?:IAppends,
   public  placeBirth?:string,
   public country?:number,
   public _method?:string

  

    
  ) {
    this.appends?.url!=appends?.url;
  }

 
  getStatus(status?: string): any {
    switch (status) {
      case 'ENABLE':
          return  {value:'En service',class:'badge-success'}
        break;
        case 'DISABLE':
          return  {value:'DESACTIVER',class:'badge-danger'} 
          break;
      default:
        break;
    }
 
  }
}
export enum STATUS{
  ENABLE="ENABLE",
  DISABLE="DISABLE"
}
export enum MARITAL{
  SINGLE="SINGLE",
  MARRIED="MARRIED",
  DIVORCE='DIVORCE'
}

export enum GENDER{
  MALE='MALE',
  FEMALE='FEMALE'
}
export enum CONTRACT{
  CDD='CDD',
  CDI='CDI',
  STAGEAIRE='STAGEAIRE'
}

interface IAppends{
  url?:string;
  name?:string;
  department:IDepartment

}
