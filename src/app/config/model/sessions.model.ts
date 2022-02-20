export interface ISession {
  id?: number;
  year?: string;
  appends?:IAppends;
  status?: STATUS;
  created_at?: Date;
  update_at?: Date;

}

interface IAppends{
  countHoliDay?:number;
}

export class Session implements ISession {
  constructor(
    public id?: number,
    public year?: string,
    public status?: STATUS,
    public created_at?: Date,
    public update_at?: Date,
    public appends?:IAppends
  ) {}

  getStatus(status?: string): any {
    switch (status) {
      case 'PENDING':
          return  {value:'ENCOURS',class:' badge-warning'}
        break;
        case 'CLOSED':
          return  {value:'CLOTURER',class:'badge-danger'} 
          break;
      default:
        break;
    }
 
  }
}
export enum STATUS {
  PENDING = 'PENDING',
  CLOSED = 'CLOSED',
  OPENED = 'OPENED',
}
