import { Address } from "./Address";
import { Availability } from "./Availability";
import { Profession } from "./Profession";

export interface Professional {

  ProfilePicture: string; //TODO: as picture, in BackEnd

  //User Info
  FirstName: string;
  LastName: string;
  /* Email: string; */
  PhoneNumber: string;

  //Profile Info

  Description?: string;
  Profession: Profession;
  Address: Address;
  BirthDate: string;
  IdCardNumber: string;
  Certificate: string; //TODO: in BackEnd */

  //Job Info
  HourleyRate: number;
  MaxDistance: number;
  LongTimeJob: boolean;
  ShortTimeJoob: boolean;
  Availability: Availability[]; //TODO: in BackEnd, should be an array or something of similar?
}
