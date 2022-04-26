import {User} from "../user";

export interface Session{
    id: number;
    date: Date;
    user: User;
    token: string;
}
