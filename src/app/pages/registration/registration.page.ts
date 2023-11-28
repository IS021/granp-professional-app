import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

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
  IonFabButton
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
import { logoNoSmoking } from 'ionicons/icons';




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
    IonModal,
    IonDatetime,
    IonToggle,
    IonButton,
    IonFabButton
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPage implements OnInit {
  //customer!: Customer
  customer: Professional = {
    FisrtName: '',
    LastName: '',
    Email: '',
    PhoneNumber: '',

    Description: '',
    Profession: Profession.Other,
    Address: new Address('', '', '', '', new GeoLocation(0, 0)),
    BirthDate: '',
    /* IdentifyCard */
    /* Certificate */
    /* ProfileImage */

    HourleyRate: 0,
    MaxDistance: 0,
    LongTimeJob: false,
    ShortTimeJoob: false,
    Availability: [new Availability('', '', false, false, false, false, false, false, false, Place.Both)],

  };

  
  showPicker = false;
  imageSelected = false;
    

  setCustomerBirthdate(event: CustomEvent) {
    this.customer.birthDate = format(
      parseISO(event.detail.value),
      'dd/MM/yyyy'
    );
    this.showPicker = false;
  }

  setElderBirthdate(event: CustomEvent) {
    this.customer.elderBirthDate = format(
      parseISO(event.detail.value),
      'dd/MM/yyyy'
    );
    this.showPicker = false;
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
      ' ',
      /\d/,
      /\d/,
    ],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) =>
    (el as HTMLIonInputElement).getInputElement();

  constructor(private cdr: ChangeDetectorRef) {}

  public async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
    });
    this.customer.profilePicture= 'data:image/jpeg;base64,' + image.base64String;
    this.imageSelected = true;
    this.cdr.detectChanges();

  }

  ngOnInit() {}
}
