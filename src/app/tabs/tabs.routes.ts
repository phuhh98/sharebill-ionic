import { Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    children: [
      {
        loadComponent: () => import('../pages/upload/upload.page').then((m) => m.UploadPage),
        path: 'upload',
      },
      {
        loadComponent: () => import('../pages/receipt/receipt.page').then((m) => m.ReceiptPage),
        path: 'receipt',
      },
      {
        loadComponent: () => import('../pages/share/share.page').then((m) => m.SharePage),
        path: 'share',
      },
      {
        loadComponent: () => import('../pages/payers/payers.page').then((m) => m.PayersPage),
        path: 'payers',
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/tabs/upload',
      },
    ],
    component: TabsPage,
    path: 'tabs',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/tabs/upload',
  },
];
