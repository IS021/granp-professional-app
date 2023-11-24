import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('granp-lib').then((m) => m.LoginPage),
    },
    {
        path: '',
        loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    },
];
