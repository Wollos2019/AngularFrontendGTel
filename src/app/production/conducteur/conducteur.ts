import { Program } from "typescript";
import { Programme } from "./conducteur-details/programme";

export interface IConducteur {
    id ? : number;
    date ? : Date;
    appends? : IAppends;
    programme? : Programme[];    
}

export class Conducteur implements IConducteur {
    constructor(
        public id ? : number,
        public date ? : Date,
        public appends? : IAppends,
        public programme? : Programme[]    
    ) {}
}

interface IAppends{
    programmes:Programme[];
}