export interface Professional {
  //User Info
  FisrtName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;

  //Profile Info

  Description?: string;
  Profession: Profession;
  Address: Address;
  BirthDate: Date;
  /* IdentityCard: File; //TODO: as picture, in BackEnd */
  /* certificate: File; //TODO: in BackEnd */
  /* ProfileImage: File; //TODO: as picture, in BackEnd */

  //Job Info
  HourleyRate: number;
  MaxDistance: number;
  LongTimeJob: boolean;
  ShortTimeJoob: boolean;
  DomicileService: boolean; //TODO in BackEnd
}
