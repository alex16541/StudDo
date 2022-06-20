import {User} from "../user";

export interface Session{
    id: number;
    name: string;
    email: string;
    token: string;
}
