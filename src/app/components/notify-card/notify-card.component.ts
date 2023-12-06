import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { Router } from '@angular/router';
import { 
  IonButton,
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle 
} from '@ionic/angular/standalone';
import { Reservation } from 'src/app/models/reservationRequest';
@Component({
  selector: 'app-notify-card',
  templateUrl: './notify-card.component.html',
  styleUrls: ['./notify-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton
  ]
})
export class NotifyCardComponent  implements OnInit {

  reservation: Reservation={
    elderFirstName: 'Franco',
    elderLastName: 'Battiato',
    isAtHome: true,
    date: '06/12/2023',
    startHour: '13:30',
    endHour: '14:00'
  };

  router = inject(Router);

  constructor() { }
  
  ngOnInit(): void {
    /* throw new Error('Method not implemented.'); */
  }

}
