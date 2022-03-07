import { EnumType } from "typescript";

export interface IContract {
  id?: number;
 
  name?:string;
  description?: string;
  test?:string;
  term?: number;
  termMeasure?:Measure
  created_at?: Date;
  update_at?: Date;
}
export enum Measure{
  DAY='d',
  SEMAINE='s',
  MONTH="m",
  YEAR="y"
  
}
export class Contract implements IContract {
  constructor(
    public id?: number,
  
    public name?:string,
    public test?:string,
    public description?: string,
    public term?: number,
    public termMeasure?:Measure,
    public created_at?: Date,
    public update_at?: Date
  ) {}

  getTerm(term?: number,termMeasure?:Measure): string {
    if(termMeasure==Measure.DAY && term!==0){
      return term +" Jour(s)";
    }

    if(termMeasure==Measure.MONTH && term!==0){
      return term +" Mois";
    }

    if(termMeasure==Measure.SEMAINE && term!==0){
      return term +" Semaine(s)";
    }

    if(termMeasure==Measure.YEAR && term!==0){
      return term +" Anneé(s)";
    }

    return "None"
  }
}
