export interface ITypeEntretien{
    id?:string,
    libelleTypeEntretien?:string,
    descriptionTypeEntretien?:string,
    //unitMesureId?:number,

}

export class TypeEntretien implements ITypeEntretien {
    constructor(
    public id?:string,
    public libelleTypeEntretien?:string,
    public descriptionTypeEntretien?:string,
    //public unitMesureId?:number

        
    ){}
}