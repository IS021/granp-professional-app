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
  IonLabel
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
import { CameraService } from 'src/app/services/camera.service' ;

import { FilePicker } from '@capawesome/capacitor-file-picker'
import { FileOpener } from '@capacitor-community/file-opener';

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
    IonLabel
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPage implements OnInit {
  professional: Professional = {
    FirstName: '',
    LastName: '',
    /*  Email: '', */
    PhoneNumber: '',

    Description: '',
    Profession: Profession.Other,
    Address: new Address('', '', '', '', new GeoLocation(0, 0)),
    BirthDate: '',
    IdCardNumber: '',
    Certificate: '',
    ProfilePicture: '',

    HourleyRate: 0,
    MaxDistance: 0,
    LongTimeJob: false,
    ShortTimeJoob: false,
    Availability: [
      new Availability(
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
      ),
    ],
  };

  showPicker = false;
  imageSelected = false;
  addressString: string = '';

  setProfessionalBirthdate(event: any) {
    this.professional.BirthDate = format(
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
  ) {}

  takePicture() {
    this.cameraService.takePicture().then((profilePicture) => {
      this.professional.ProfilePicture = profilePicture;
      this.imageSelected = true;
      this.cdr.detectChanges();
    });
  }

  submitProfessionalAddress() {
    this.addressString = `${this.professional.Address.Street}, ${this.professional.Address.StreetNumber}, ${this.professional.Address.City}, ${this.professional.Address.ZipCode}`;
    this.professional.Address.setFullAddress(this.addressString);

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

   pickImages = async () => {
    const result = await FilePicker.pickImages({

      readData: true
    });
    this.professional.Certificate = 'data:image/jpg;base64,' + result.files[0].data;
    this.cdr.detectChanges();
  };
  

  ngOnInit() {}
}
