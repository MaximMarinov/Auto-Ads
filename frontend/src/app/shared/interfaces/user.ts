import { IAd } from "./ad";

export interface IUser {
    _id?: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    ads: string[];
}
