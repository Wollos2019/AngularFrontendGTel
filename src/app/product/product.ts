export interface IProduct {
    id : string,
    name : string,
    description : string,
    price : string
}

export class Product implements IProduct {
    constructor(
    public id : string,
    public name : string,
    public description : string,
    public price : string
    ) {}
}
