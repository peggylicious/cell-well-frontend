import { Routes, UrlSegment } from '@angular/router';
import { AuthComponent } from './core/components/auth/auth.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  // {
  //   path: ':authPath',
  //   component: AuthComponent,
  // }
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'register',
    component: AuthComponent,
  },
  {
    path: 'sendOtp',
    component: AuthComponent,
  },
  {
    path: 'verifyOtp',
    component: AuthComponent,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
