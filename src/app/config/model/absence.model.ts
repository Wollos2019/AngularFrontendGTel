export interface IAbsence {
  id?: number;
  type?: string;
  title?:string;
  description?: string;
  color?:string;
  status?: number;
  created_at?: Date;
  update_at?: Date;
}

export class Absence implements IAbsence {
  constructor(
    public id?: number,
    public type?: string,
    public title?:string,
    public color?:string,
    public description?: string,
    public status?: number,
    public created_at?: Date,
    public update_at?: Date
  ) {}

  getStatus(status?: number): {value:string,class:string} {
    return status === 1 ? {value:'ACTIVER',class:'badge-success'} : {value:'DESACTIVER',class:'badge-danger'};
  }
}
