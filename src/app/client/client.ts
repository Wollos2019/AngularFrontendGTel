export interface Iclient {
    id? : string;
    nom? : string;
    prenom? : string;
    civilityId? : string;
    email? : string;
    telephone? : string;
    adresse? : string;
    country? : string;
    town? : string;
    gender? : string;
    appends?: IAppends;
}

export class Client implements Iclient {
    constructor(
    public id? : string,
    public nom? : string,
    public prenom? : string,
    public civilityId? : string,
    public email? : string,
    public telephone? : string,
    public adresse? : string,
    public country? : string,
    public town? : string,
    public gender? : string,
    public appends?: IAppends,
    )
    {
        this.appends?.url != appends?.url;
    }
}

interface IAppends {
    url?: string;
    name?: string;
}