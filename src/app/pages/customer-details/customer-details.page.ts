import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Platform } from '@ionic/angular';
import {
    IonItem,
    IonLabel,
    IonList,
    IonAvatar,
    IonContent,
    IonText,
    IonRow,
    IonCol,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonTitle
}
    from '@ionic/angular/standalone'

import { addIcons } from 'ionicons';
import { call, home, personCircleOutline, calendarOutline, maleOutline, femaleOutline, helpOutline } from 'ionicons/icons';

import { Gender, CustomerProfileRequest, SearchService, CustomerPublicResponse } from 'granp-lib';
import { ActivatedRoute } from '@angular/router';
import { ShellService } from 'src/app/shell.service';

@Component({
    selector: 'app-customer-details',
    templateUrl: './customer-details.page.html',
    styleUrls: ['./customer-details.page.scss'],
    standalone: true,
    imports: [CommonModule,
        FormsModule,
        IonItem,
        IonLabel,
        IonList,
        IonAvatar,
        IonContent,
        IonText,
        IonRow,
        IonCol,
        IonIcon,
        IonHeader,
        IonToolbar,
        IonBackButton,
        IonButtons,
        IonTitle
    ]
})
export class CustomerDetailsPage implements OnInit {

    activatedRoute = inject(ActivatedRoute);
    searchService = inject(SearchService);
    shell = inject(ShellService);

    customer?: CustomerPublicResponse;

    constructor(private platform: Platform) {
        addIcons({ call, home, personCircleOutline, calendarOutline, maleOutline, femaleOutline, helpOutline });

        this.activatedRoute.queryParams.subscribe(params => {
            // this.professional = JSON.parse(params["professional"]) as ProfessionalPublicResponse;
            const customerId = params["id"];
            if (customerId) {
                this.searchService.customerInfo(customerId).then((customer) => {
                    this.customer = customer;
                    this.shell.hideLoader();
                });
            }
        });
    }

    ionViewWillEnter() {
        if(this.customer === undefined) {
            this.shell.showLoader();
        }
    }

    ngOnInit() {
    }

    callNumber() {
        if (this.customer?.phoneNumber) {
            const phoneNumber = '+39' + this.customer.phoneNumber;
            this.platform.ready().then(() => {
                window.location.href = 'tel:' + phoneNumber;
            });
        } else {
            console.error('Il numero di telefono non è definito.');
        }
    }

    callElderNumber() {
        const phoneNumber = '+39' + this.customer?.elderPhoneNumber;
        this.platform.ready().then(() => {
            window.location.href = 'tel:' + phoneNumber;
        });
    }

    checkGender(): string {
        switch (this.customer?.gender) {
            case Gender.Male:
                return 'Uomo';
            case Gender.Female:
                return 'Donna';
            default:
                return 'Non definito';
        }
    }

    checkGenderIcon(): string {
        switch (this.customer?.gender) {
            case Gender.Male:
                return 'male-outline';
            case Gender.Female:
                return 'female-outline';
            default:
                return 'help-outline';
        }
    }

}
