import { Component, inject } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    IonNote,
} from '@ionic/angular/standalone';

import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { MaskitoModule } from '@maskito/angular';

import { ChangeDetectionStrategy } from '@angular/core';

import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

import {
    ImageSelectorComponent,
    AddressSelectorComponent,
    BirthdateSelectorComponent,
    CertificateSelectorComponent,
    AvailabilitySelectorComponent,
    ProfessionalProfileRequest,
    TimeTableRequest,
    TimeSlotRequest,
    Availability,
    Place,
    ProfileService,
} from 'granp-lib';

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
        IonNote,
        MaskitoModule,
        ImageSelectorComponent,
        AddressSelectorComponent,
        BirthdateSelectorComponent,
        CertificateSelectorComponent,
        AvailabilitySelectorComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPage {
    profileService = inject(ProfileService);

    professional: ProfessionalProfileRequest = new ProfessionalProfileRequest();

    // Defining TimeTable for db
    timeTable: TimeTableRequest = new TimeTableRequest();

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

    availabilities: Availability[] = [];
    certificate: string = '';

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

    readonly maskPredicate: MaskitoElementPredicateAsync = async (el) =>
        (el as HTMLIonInputElement).getInputElement();

    constructor() {
        addIcons({ trashOutline });
    }

    /* Card Number masking */
    readonly cardMask: MaskitoOptions = {
        mask: ['C', 'A', /\d/, /\d/, /\d/, /\d/, /\d/, /[a-zA-Z]/, /[a-zA-Z]/],
        postprocessors: [
            ({ value, selection }) => ({ value: value.toUpperCase(), selection }),
        ],
    };

    completeRegistration() {
        this.profileService.completeProfile(this.professional);

        // Update timeTable

    }
}
