export interface IUnitMesure{
    id?:string;
    symboleUniteMesure?:string;
    libelleUniteMesure?:string;

}

export class UnitMesure implements IUnitMesure {
    constructor(
        public id?:string,
        public libelleUniteMesure?:string,
        public symboleUniteMesure?:string,
        
    ){}
}