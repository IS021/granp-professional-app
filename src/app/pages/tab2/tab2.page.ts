import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { ProfessionalPublicResponse, ReservationCardComponent, ReservationResponse, ReservationStatus } from 'granp-lib';
import { CustomerPublicResponse } from 'granp-lib/models/CustomerPublicResponse';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
    standalone: true,
    imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, ReservationCardComponent]
})
export class Tab2Page {

    router = inject(Router);

    /*
    export interface ReservationResponse {
    id: string;
    professional: ProfessionalPublicResponse;
    customer: CustomerPublicResponse;
    date: string;
    start: string;
    end: string;
    status: ReservationStatus;
}
    */

    reservation: ReservationResponse = {
        id: "1",
        professional: {
            firstName: "John",
            lastName: "Doe",            
        } as ProfessionalPublicResponse,
        customer: {
            firstName: "Jane",
            lastName: "Doe"
        } as CustomerPublicResponse,
        date: "2021-01-01",
        start: "08:00",
        end: "09:00",
        status: ReservationStatus.Pending
    };


    constructor() { }

}
