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
     country?: string;
     town?: string;
     status?:STATUS;
     created_at?: Date;
     update_at?: Date;
     civility?:number;
     isAdmin?:boolean;
     courriel?:string;
     marital?:MARITAL
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
    public country?: string,
    public town?: string,
    public civility?:number,
    public status?:STATUS,
    public created_at?: Date,
    public update_at?: Date,
    public isAdmin?:boolean,
    public courriel?:string,
    public marital?:MARITAL
  ) {}
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
