export interface IUnitMesure{
    id?:number;
    symboleUniteMesure?:string;
    libelleUniteMesure?:string;

}

export class UnitMesure implements IUnitMesure {
    constructor(
        public id?:number,
        public libelleUniteMesure?:string,
        public symboleUniteMesure?:string,
        
    ){}
}