export interface IDepartment {
  id?: number;
  name?: string;
  description?: string;
  status?:STATUS;
  created_at?: Date;
  update_at?: Date;
}

export class Department implements IDepartment {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public status?:STATUS,
    public created_at?: Date,
    public update_at?: Date
  ) {}
}
export enum STATUS{
  ENABLE="ENABLE",
  DISABLE="DISABLE"
}
