export class KibanaConfig {
    host: string;
    space?: string;
    username: string;
    password: string;

    constructor(host: string, username: string, password: string, space?: string)
    {  
        this.host = host;
        this.space = space;
        this.username = username;
        this.password = password;
    }
}