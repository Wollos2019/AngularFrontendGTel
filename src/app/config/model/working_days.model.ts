export interface IWorkingDay{
  id?: number;
  day?: string;
  status?:STATUS;
  departureTime?:any;
  arrivingTime?:any;
  created_at?: Date;
  update_at?: Date;
}

export class WorkingDay implements IWorkingDay {
  constructor(
    public id?: number,
    public name?: string,
    public day?: string,
    public created_at?: Date,
    public status?:STATUS,
    public update_at?: Date,
    public arrivingTime?:any,
    public departureTime?:any,
  ) {}
}
export enum STATUS{
  ENABLE='1',
  DISABLE='0'
}
