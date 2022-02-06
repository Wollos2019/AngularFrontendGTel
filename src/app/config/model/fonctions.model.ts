export interface IFonction{
  id?: number;
  name?: string;
  description?: string;
  status?:STATUS;
  created_at?: Date;
  update_at?: Date;
}

export class Fonction implements IFonction {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public created_at?: Date,
    public status?:STATUS,
    public update_at?: Date
  ) {}
}
export enum STATUS{
  ENABLE="ENABLE",
  DISABLE="DISABLE"
}
