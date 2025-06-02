import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'upload',
        loadComponent: () => import('../upload/upload.page').then((m) => m.UploadPage),
      },
      {
        path: 'receipt',
        loadComponent: () => import('../receipt/receipt.page').then((m) => m.ReceiptPage),
      },
      {
        path: 'share',
        loadComponent: () => import('../share/share.page').then((m) => m.SharePage),
      },
      {
        path: 'payers',
        loadComponent: () => import('../payers/payers.page').then((m) => m.PayersPage),
      },
      {
        path: '',
        redirectTo: '/tabs/upload',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/upload',
    pathMatch: 'full',
  },
];
