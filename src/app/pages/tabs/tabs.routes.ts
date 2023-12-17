import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'chats',
        loadComponent: () =>
          import('granp-lib').then((m) => m.ChatListPage),
      },
      {
        path: 'calendar',
        loadComponent: () =>
          import('granp-lib').then((m) => m.CalendarPage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../modify-profile/modify-profile.page').then((m) => m.ModifyProfilePage),
      },
      {
        path: 'reservation-inbox',
        loadComponent: () => import('../reservation-inbox/reservation-inbox.page').then( m => m.ReservationInboxPage)
      },
      {
        path: '',
        redirectTo: '/tabs/calendar',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];
