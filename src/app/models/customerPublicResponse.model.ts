import { Address } from "./Address";

export interface Customer {
    profilePicture: string;

    elderFirstName: string;
    elderLastName: string;
    elderAddress: string;
    elderBirthDate: string;
    elderAge: number;
    elderTelephoneNumber: string;
    elderDescription: string;

    firstName: string;
    lastName: string;
    phoneNumber: string;

    isElder: boolean; 
}