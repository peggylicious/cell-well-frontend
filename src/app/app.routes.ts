import { Routes, UrlSegment } from '@angular/router';
import { AuthComponent } from './core/components/auth/auth.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { HomeComponent } from './admin/components/home/home.component';
import { adminGuard } from './core/guards/admin.guard';

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
    path: 'resetPassword',
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
    path: 'admin/home',
    component: HomeComponent,
    canActivate: [adminGuard]
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
