import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

import { Availability } from '../../models/Availability';
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
  IonAvatar,
} from '@ionic/angular/standalone';

import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { MaskitoModule } from '@maskito/angular';

import { Professional } from '../../models/professional.model';

import { ChangeDetectionStrategy } from '@angular/core';

import { format, parseISO, set } from 'date-fns';

import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { CameraService } from 'src/app/services/camera.service';

import { FilePicker } from '@capawesome/capacitor-file-picker';

import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
    MaskitoModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPage implements OnInit {
  professional: Professional = new Professional();

  showPicker = false;
  imageSelected = false;
  addressString: string = '';

  newAvailability: Availability = new Availability(
    '08:00',
    '09:00',
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
    addIcons({ trashOutline });
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
    mask: ['k', 'm', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  };

  /* hourlyRate masking */
  readonly rateMask: MaskitoOptions = {
    mask: ['€', '/', 'h', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
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
    this.newAvailability.StartHour = event.detail.value;
  }

  setEndHour(event: any) {
    this.newAvailability.EndHour = event.detail.value;
  }

  /* Availability management */
  addNewAvailability() {
    if ((this.newAvailability.Monday || this.newAvailability.Tuesday || this.newAvailability.Wednesday || this.newAvailability.Thursday || this.newAvailability.Friday || this.newAvailability.Saturday || this.newAvailability.Sunday)
          && (this.newAvailability.StartHour < this.newAvailability.EndHour)) {
      const availability = this.newAvailability;
      this.professional.availability.push(availability);
      this.newAvailability = new Availability(
        '08:00',
        '09:00',
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
  }

  removeAvailability(availability: Availability) {
    const index = this.professional.availability.indexOf(availability);
    this.professional.availability.splice(index, 1);
    console.log(this.professional.availability);
  }

  ngOnInit() {}
}
