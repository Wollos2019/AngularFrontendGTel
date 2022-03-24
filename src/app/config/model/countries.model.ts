export interface ICountry {
  id?: number;
  name?: string;
  description?: string;
  code?: string;
  codePhone?: string;
  abbreviation1?: string;
  abbreviation2?: string;
  status?: number;
  created_at?: Date;
  update_at?: Date;
}

export class Country implements ICountry {
  constructor(
    public id?: number,
    public name?: string,
    public code?: string,
    public codePhone?: string,
    public abbreviation1?: string,
    public abbreviation2?: string,
    public description?: string,
    public status?: number,
    public created_at?: Date,
    public update_at?: Date
  ) {
  }

  getStatus(status?: number): string {
    return status === 1 ? 'ACTIVER' : 'DESACTIVER';
  }
}

export enum STATUS {
  ENABLE = 'ENABLE',
  DISABLE = 'DISABLE',
}
