import { Contract } from 'src/app/config/model/contract.model';
import { IDepartment } from 'src/app/config/model/department.model';
import { Fonction } from 'src/app/config/model/fonctions.model';

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
  status?: STATUS;
  created_at?: Date;
  update_at?: Date;
  civilityId?: number;
  isAdmin?: boolean;
  courriel?: string;
  marital?: MARITAL;
  password?: string;
  appends?: IAppends;
  placeBirth?: string;
  country?: number;
  _method?: string;
  salary?:number;
  fonctionId?:number;
  contractId?:number;
  departmentId?:number;
  dateStart?:Date;
  dateEnd?:Date;
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
    public civilityId?: number,
    public status?: STATUS,
    public created_at?: Date,
    public update_at?: Date,
    public isAdmin?: boolean,
    public courriel?: string,
    public marital?: MARITAL,
    public password?: string,
    public appends?: IAppends,
    public placeBirth?: string,
    public country?: number,
    public fonctionId?:number,
    public departmentId?:number,
    public salary?:number,
    public contractId?:number,
    public _method?: string,
    public dateStart?:Date,
    public dateEnd?:Date
  ) {
    this.appends?.url != appends?.url;
  }

  getStatus(status?: string): any {
    switch (status) {
      case 'ENABLE':
        return { value: 'En service', class: 'badge-success' };
        break;
      case 'DISABLE':
        return { value: 'DESACTIVER', class: 'badge-danger' };
        break;
      default:
        break;
    }
  }
}
export enum STATUS {
  ENABLE = 'ENABLE',
  DISABLE = 'DISABLE',
}
export enum MARITAL {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCE = 'DIVORCE',
}

export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
export enum CONTRACT {
  CDD = 'CDD',
  CDI = 'CDI',
  STAGEAIRE = 'STAGEAIRE',
}

interface IAppends {
  url?: string;
  name?: string;
  contracts?: Contract[];
}
