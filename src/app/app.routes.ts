import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('granp-lib').then((m) => m.granpRoutes),
    },
    {
        path: '',
        loadChildren: () => import('./pages/tabs/tabs.routes').then((m) => m.routes),
    },
 /*    {
        path: 'registration',
        loadComponent: () => import('./pages/registration/registration.page').then(m => m.RegistrationPage)
    }, */
    {
        path: 'customer-details',
        loadComponent: () => import('./pages/customer-details/customer-details.page').then(m => m.CustomerDetailsPage)
    }

];
