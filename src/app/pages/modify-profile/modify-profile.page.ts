import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Maskito, MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { MaskitoModule } from '@maskito/angular';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonContent,
  IonList,
  IonItem,
  IonListHeader,
  IonLabel,
  IonSelectOption,
  IonSelect,
  IonTextarea,
  IonCard,
  IonCardContent,
  IonDatetime,
  IonDatetimeButton,
  IonInput,
  IonCheckbox
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  pencilOutline,
  closeOutline,
  checkmarkOutline,
  personCircleOutline,
  calendarOutline,
  mailOpenOutline,
  call,
  medicalOutline,
  locationOutline,
  walletOutline,
  maleOutline,
  femaleOutline,
  helpOutline,
  locateOutline,
  cardOutline
} from 'ionicons/icons';

import {
  ProfessionalProfileResponse,
  AvatarComponent,
  ImageSelectorComponent,
  BirthdateSelectorComponent,
  AddressSelectorComponent,
  AvailabilitySelectorComponent,
  CertificateSelectorComponent,
  Gender,
  Profession,
  Address,
  Availability,
  Place,
} from 'granp-lib';
@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.page.html',
  styleUrls: ['./modify-profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MaskitoModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonIcon,
    IonContent,
    IonList,
    IonItem,
    IonListHeader,
    IonLabel,
    IonSelectOption,
    IonSelect,
    IonTextarea,
    IonCard,
    IonDatetime,
    IonDatetimeButton,
    IonInput,
    IonCheckbox,
    IonCardContent,
    AvatarComponent,
    ImageSelectorComponent,
    BirthdateSelectorComponent,
    AddressSelectorComponent,
    AvailabilitySelectorComponent,
    CertificateSelectorComponent
  ],
})
export class ModifyProfilePage implements OnInit {
  /*  professionalLogged?: ProfessionalProfileResponse; */

  professionalLogged: ProfessionalProfileResponse = {
    firstName: 'John',
    lastName: 'Doe',
    gender: Gender.Male,
    email: 'johndoe@gmail.com',
    phoneNumber: '+39 123 456 7890',
    profilePicture:
      'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.',
    profession: Profession.Doctor,
    address: Object.assign(new Address(), {
      street: 'Via Roma',
      streetNumber: '1',
      city: 'Roma',
      zipCode: '00100',
      location: { Latitude: 0, Longitude: 0 },
    }),
    birthDate: '1990-01-01',
    idCardNumber: 'CA123456AA', //da fareeeee
    isVerified: true,

    hourlyRate: 50,
    maxDistance: 50,
    longTimeJob: true,
    shortTimeJob: false,
  };

  editingProfile: boolean = false;
  availabilities: Availability[] = [
    {
      StartHour: '09:00',
      EndHour: '10:00',
      Monday: true,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false,
      Place: Place.Office,
    },
    {
      StartHour: '09:00',
      EndHour: '10:00',
      Monday: true,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: true,
      Saturday: false,
      Sunday: false,
      Place: Place.Domicile,
    }
  ];

  constructor() {
    addIcons({
      pencilOutline,
      closeOutline,
      checkmarkOutline,
      personCircleOutline,
      calendarOutline,
      mailOpenOutline,
      call,
      medicalOutline,
      locationOutline,
      walletOutline,
      maleOutline,
      femaleOutline,
      helpOutline,
      locateOutline,
      cardOutline
    });
  }

  toggleBoolean() {
    this.editingProfile = !this.editingProfile;
  }

  submitChanges() {
    this.editingProfile = false;
    console.log(this.professionalLogged);
  }

  checkGender(): string {
    switch (this.professionalLogged.gender) {
      case Gender.Male:
        return 'Uomo';
      case Gender.Female:
        return 'Donna';
      default:
        return 'Non definito';
    }
  }

  checkGenderIcon(): string {
    switch (this.professionalLogged.gender) {
      case Gender.Male:
        return 'male-outline';
      case Gender.Female:
        return 'female-outline';
      default:
        return 'help-outline';
    }
  }

  readonly phoneMask: MaskitoOptions = {
    mask: [
      '+',
      '3',
      '9',
      ' ',
      /\b[1-9]\b/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ],
  };

  readonly numbersMask: MaskitoOptions = {
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
};

readonly cardMask: MaskitoOptions = {
  mask: ['C', 'A', /\d/, /\d/, /\d/, /\d/, /\d/, /[a-zA-Z]/, /[a-zA-Z]/],
  postprocessors: [
      ({ value, selection }) => ({ value: value.toUpperCase(), selection }),
  ],
};

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) =>
    (el as HTMLIonInputElement).getInputElement();

  ngOnInit() {}
}
