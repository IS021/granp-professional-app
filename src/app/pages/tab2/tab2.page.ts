import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
    standalone: true,
    imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, ExploreContainerComponent]
})
export class Tab2Page {

    router = inject(Router);

    constructor() { }

}
