import { Component, inject } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '@auth0/auth0-angular';

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
    TimetableService,
} from 'granp-lib';
import { Router } from '@angular/router';
import { ShellService } from 'src/app/shell.service';

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
    auth = inject(AuthService);
    router = inject(Router);
    shell = inject(ShellService);
    timetableService = inject(TimetableService)

    professional: ProfessionalProfileRequest = new ProfessionalProfileRequest();

    timeSlots: TimeSlotRequest[] = [];
    weeksInAdvance: number = 3;

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

        // Get eamil from auth service
        this.auth.user$.subscribe((user) => {
            if (user && user.email) {
                this.professional.email = user.email;   
            }

            console.log('Sending profile: ', this.professional);
            this.shell.showLoader();

            this.profileService.completeProfile(this.professional).then((res) => {
                console.log('Profile completed: ', res);
                this.shell.hideLoader();

                this.router.navigate(['/tabs']);
            }).catch((err) => {
                console.log('Error completing profile: ', err);
                this.shell.hideLoader();

                this.router.navigate(['/registration']);
            });
        });

        // Update timeTable
        this.timetableService.update(
            new TimeTableRequest(this.weeksInAdvance, this.timeSlots)
        ).then((res) => {
            console.log('TimeTable updated: ', res);
        });
    }
}
