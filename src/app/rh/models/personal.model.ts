export interface IPersonal {
   id?: number;
     lastname?: string;
     firstname?: string;
     email?: string;
     cni?: string;
     sex?: string;
     cnps?: string;
     matrimonial?: string;
     numberChild?: string;
     phone?: string;
     address?: string;
     dateNaissance?: string;
     country?: string;
     town?: string;
     status?:STATUS;
     created_at?: Date;
     update_at?: Date;
}

export class Personal implements IPersonal {
  constructor(
    public id?: number,
    public lastname?: string,
    public firstname?: string,
    public email?: string,
    public cni?: string,
    public sex?: string,
    public cnps?: string,
    public matrimonial?: string,
    public numberChild?: string,
    public phone?: string,
    public address?: string,
    public dateNaissance?: string,
    public country?: string,
    public town?: string,
    public status?:STATUS,
    public created_at?: Date,
    public update_at?: Date
  ) {}
}
export enum STATUS{
  ENABLE="ENABLE",
  DISABLE="DISABLE"
}
