import { Address } from "./Address";
import { Availability } from "./Availability";
import { Profession } from "./Profession";

export interface Professional {

  profilePicture: string; //TODO: as picture, in BackEnd

  //User Info
  firstName: string;
  lastName: string;
  /* Email: string; */
  phoneNumber: string;

  //Profile Info

  description?: string;
  profession: Profession;
  address: Address;
  birthDate: string;
  idCardNumber: string;
  certificate: string; //TODO: in BackEnd */

  //Job Info
  hourlyRate: number| null;
  maxDistance: number | null;
  longTimeJob: boolean;
  shortTimeJoob: boolean;
  availability: Availability[]; //TODO: in BackEnd, should be an array or something of similar?
}
