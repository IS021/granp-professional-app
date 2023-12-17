import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationCardComponent, ReservationResponse, ReservationService, ReservationStatus } from 'granp-lib';
import { IonContent, IonHeader, IonNote, IonTitle, IonToolbar, LoadingController } from '@ionic/angular/standalone';

@Component({
    selector: 'app-reservation-inbox',
    templateUrl: './reservation-inbox.page.html',
    styleUrls: ['./reservation-inbox.page.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule, ReservationCardComponent, IonTitle, IonContent, IonToolbar, IonHeader, IonNote]
})
export class ReservationInboxPage implements OnInit {

    reservationService = inject(ReservationService);
    loading = inject(LoadingController);

    reservations: ReservationResponse[] = [];

    constructor() { }

    // ionViewWillEnter() {
    ngOnInit() {
        this.loading.create({
            message: 'Loading reservations...'
        }).then((loading) => {
            loading.present();
            this.reservationService.getAll().then((reservations) => {
                this.reservations = reservations.filter((reservation) => {
                    loading.dismiss();
                    return reservation.status === ReservationStatus.Pending;
                });
            });
        });
    }

}
