import { IUser } from "./user";

export interface IAd {
    _id: string;
    title: string;
    img: string;
    year: number;
    engine: string;
    transmission: string;
    place: string;
    cubature: number;
    mileage: number;
    eurostandard: number;
    color: string;
    description: string;
    price: number; 
    creator: IUser;       
}

export interface APIResponse<T> {
    items: Array<T>;
}
