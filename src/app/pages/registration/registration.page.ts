import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

import { Address } from '../../models/Address';
import { Availability } from '../../models/Availability';
import { GeoLocation } from '../../models/Location';
import { Profession } from 'src/app/models/Profession';
import { Place } from 'src/app/models/Place';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonModal,
  IonDatetime,
  IonToggle,
  IonButton,
  IonFabButton,
  IonTextarea,
  IonButtons,
  ModalController,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonIcon,
  IonCard,
  IonDatetimeButton,
  IonRow,
  IonCheckbox,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonCol,
  IonCardContent,
  IonAvatar
} from '@ionic/angular/standalone';

import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { MaskitoModule } from '@maskito/angular';

import { Professional } from '../../models/professional.model';

import { ChangeDetectionStrategy } from '@angular/core';

import { format, parseISO } from 'date-fns';

import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { CameraService } from 'src/app/services/camera.service';

import { FilePicker } from '@capawesome/capacitor-file-picker';

import { addIcons } from 'ionicons';
import { add, checkmarkDoneCircle } from 'ionicons/icons';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MaskitoModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonTextarea,
    IonModal,
    IonDatetime,
    IonToggle,
    IonButton,
    IonFabButton,
    IonButtons,
    IonSelect,
    IonSelectOption,
    IonLabel,
    IonIcon,
    IonCard,
    IonDatetimeButton,
    IonRow,
    IonCheckbox,
    IonCardHeader,
    IonCardTitle,
    IonText,
    IonCol,
    IonCardContent,
    IonAvatar,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPage implements OnInit {
  professional: Professional = {
    firstName: '',
    lastName: '',
    /*  Email: '', */
    phoneNumber: '',

    description: '',
    profession: Profession.Other,
    address: new Address('', '', '', '', new GeoLocation(0, 0)),
    birthDate: '',
    idCardNumber: '',
    certificate: '',
    profilePicture: '',

    hourlyRate: null,
    maxDistance: null,
    longTimeJob: false,
    shortTimeJoob: false,
    availability: [],
  };

  showPicker = false;
  imageSelected = false;
  addressString: string = '';

  newAvailability: Availability = new Availability(
    '',
        '',
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        Place.Both
  );

  setProfessionalBirthdate(event: any) {
    this.professional.birthDate = format(
      parseISO(event.detail.value),
      'dd/MM/yyyy'
    );
    this.showPicker = false;
  }

  /* Phone number masking  */
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

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => 
    (el as HTMLIonInputElement).getInputElement();
  
  constructor(
    private cameraService: CameraService,
    private cdr: ChangeDetectorRef,
    private modalController: ModalController    
  ) {
    addIcons({ add, checkmarkDoneCircle });
  }

  /* Camera service for profile picture */
  takePicture() {
    this.cameraService.takePicture().then((profilePicture) => {
      this.professional.profilePicture = profilePicture;
      this.imageSelected = true;
      this.cdr.detectChanges();
    });
  }

  submitProfessionalAddress() {
    this.addressString = `${this.professional.address.Street}, ${this.professional.address.StreetNumber}, ${this.professional.address.City}, ${this.professional.address.ZipCode}`;
    this.professional.address.setFullAddress(this.addressString);

    // Dismiss the modal and pass addressString
    this.modalController.dismiss({
      addressString: this.addressString,
    });
  }

  /* Card Number masking */
  readonly cardMask: MaskitoOptions = {
    mask: ['C', 'A', /\d/, /\d/, /\d/, /\d/, /\d/, /[a-zA-Z]/, /[a-zA-Z]/],
    postprocessors: [
      ({ value, selection }) => ({ value: value.toUpperCase(), selection }),
    ],
  };

  /* maxDistance masking */
  readonly distanceMask: MaskitoOptions = {
    mask: [/^[0-9]*$/, 'Km']
  };

  /* hourlyRate masking */
  readonly rateMask: MaskitoOptions = {
    mask: [ /^[0-9]*$/, '€/h'],
  };

  /* Certificate picker */
  pickImages = async () => {
    const result = await FilePicker.pickImages({
      readData: true,
    });
    this.professional.certificate =
      'data:image/jpg;base64,' + result.files[0].data;
    this.cdr.detectChanges();
  };

  /* Defining availabilities info */
  setStartHour(event: any) {
      this.newAvailability.StartHour = format(
        parseISO(event.detail.value),
        'HH:mm'
      );
    }
  

  setEndHour(event: any) {
      this.newAvailability.EndHour = format(parseISO(event.detail.value), 'HH:mm');
  }

  addNewAvailability() {
    const availability = this.newAvailability;
    this.professional.availability.push(availability);
    this.newAvailability = new Availability(
      '',
      '',
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      Place.Both
    );
  }

  ngOnInit() {}
}
