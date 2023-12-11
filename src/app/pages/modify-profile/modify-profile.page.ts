import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
    Maskito,
    MaskitoElementPredicateAsync,
    MaskitoOptions,
} from '@maskito/core';
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
    IonCheckbox,
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
    cardOutline,
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
    TimeSlotResponse,
    ProfileService,
} from 'granp-lib';
import { ShellService } from 'src/app/shell.service';
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
        CertificateSelectorComponent,
    ],
})
export class ModifyProfilePage {

    profileService = inject(ProfileService);
    cdRef = inject(ChangeDetectorRef);
    shell = inject(ShellService);

    editingProfile: boolean = false;
    timeSlots: TimeSlotResponse[] = [];

    professionalLogged?: ProfessionalProfileResponse;

    ionViewWillEnter(): void {
        this.shell.showLoader();
        this.profileService.getProfile<ProfessionalProfileResponse>().then((profile) => {
            this.professionalLogged = profile;
            this.cdRef.detectChanges();
            this.shell.hideLoader();
        });
    }

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
            cardOutline,
        });
    }

    toggleBoolean() {
        this.editingProfile = !this.editingProfile;
    }

    submitChanges() {
        this.editingProfile = false;
        this.profileService.updateProfile(this.professionalLogged);
    }

    checkGender(): string {
        switch (this.professionalLogged?.gender) {
            case Gender.Male:
                return 'Uomo';
            case Gender.Female:
                return 'Donna';
            default:
                return 'Non definito';
        }
    }

    checkGenderIcon(): string {
        switch (this.professionalLogged?.gender) {
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


    getProfession(profession?: Profession) {
        switch(profession) {
            case Profession.Doctor:
                return "Dottore";
            case Profession.Nurse:
                return "Infermiere";
            case Profession.Physiotherapist:
                return "Fisioterapista";
            case Profession.Caregiver:
                return "Badante";
            case Profession.Other:
                return "Altro";
            default:
                return "Nessuna professione";
        }
    }

    
}
