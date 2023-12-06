import { Routes, UrlSegment } from '@angular/router';
import { AuthComponent } from './core/components/auth/auth.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: ':authPath',
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
  // {
  //   // path: '@Angular',
  //   component: AuthComponent,
  //   matcher: (url) => {
  //     if (url.length === 1 && url[0].path.match(/@login[\w]+$/gm)) {
  //       console.log('Hello')
  //       return {consumed: url, posParams: {username: new UrlSegment(url[0].path.slice(0), {})}};
  //     }
  //     return null;
  //   },
  // }
];
