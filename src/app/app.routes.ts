import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    path: '',
  },
];
