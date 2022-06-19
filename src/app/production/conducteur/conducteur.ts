export interface IConducteur {
    id ? : number;
    date ? : Date;    
}

export class Conducteur implements IConducteur {
    constructor(
        public id ? : number,
        public date ? : Date       
    ) {}
}