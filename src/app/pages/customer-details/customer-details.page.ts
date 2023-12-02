import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer } from 'src/app/models/customerPublicResponse.model';
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
import { call, home, personCircleOutline, calendarOutline } from 'ionicons/icons';

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

  customerLogged: Customer={
    profilePicture: 'https://www.inchiestaonline.it/wp-content/uploads/2021/05/Battiato.jpg',

    elderFirstName: 'Franco',
    elderLastName: 'Battiato',
    elderAddress: 'Via dei Cantieri matti, 69, Palese, 70128',
    elderBirthDate: '25/12/0000',
    elderAge: 2023,
    elderTelephoneNumber: '6666666669',
    elderDescription: 'Soffro di gravi reumatismi dovuti alla mia ossessione per i cantieri, che mi porta a passare lunghe giornate al freddo fuori casa per controllare gli operai',

    firstName: 'Pinuccio',
    lastName: 'Battiato',
    phoneNumber: '1234567890',

    isElder: false,
  };

  constructor() {
    addIcons({call, home, personCircleOutline, calendarOutline});
  }

  ngOnInit() {
  }

}
