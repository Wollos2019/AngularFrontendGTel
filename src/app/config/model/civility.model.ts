export interface ICivility {
  id?: number;
  name?: string;
  description?: string;
  status?: number;
  created_at?: Date;
  update_at?: Date;
  abbreviation?:string;
}

export class Civility implements ICivility {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public status?: number,
    public created_at?: Date,
    public update_at?: Date,
    public abbreviation?:string
  ) {}

  getStatus(status?: number): string {
    return status === 1 ? 'ACTIVER' : 'DESACTIVER';
  }
}
export enum STATUS {
  ENABLE = 'ENABLE',
  DISABLE = 'DISABLE',
}
