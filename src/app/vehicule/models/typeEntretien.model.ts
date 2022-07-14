export interface ITypeEntretien{
    id?:number,
    libelleTypeEntretien?:string,
    descriptionTypeEntretien?:string,
    //unitMesureId?:number,

}

export class TypeEntretien implements ITypeEntretien {
    constructor(
    public id?:number,
    public libelleTypeEntretien?:string,
    public descriptionTypeEntretien?:string,
    //public unitMesureId?:number

        
    ){}
}