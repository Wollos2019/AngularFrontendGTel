export interface IHoliDay {
  id?: number;
  date?: string;
  status?: STATUS;
  name?:string;
  sessionId?:number;
  created_at?: Date;
  update_at?: Date;
}

export class HoliDay implements IHoliDay {
  constructor(
    public id?: number,
    public date?: string,
    public name?: string,
    public sessionId?: number,
    public status?: STATUS,
    public created_at?: Date,
    public update_at?: Date
  ) {}

  getStatus(status?: string): any {
    switch (status) {
      case 'ENABLE':
          return  {value:'ACTIVER',class:'badge-warning'}
        break;
        case 'DISABLE':
          return  {value:'DESACTIVER',class:'badge-danger'} 
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
