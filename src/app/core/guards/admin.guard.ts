import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const adminGuard: CanActivateFn = (route, state) => {
  // const loggedInUser = JSON.parse(localStorage.getItem('cwNewUser')!);
  // const loggedInUser = inject(AuthenticationService)
  const loggedInUser = JSON.parse(localStorage.getItem('cwNewUser') as string);

  // if(loggedInUser.role === 'Admin'){
  if(loggedInUser?.role === 'Admin'){
    return true
  }else{
    return false
  }
  // return JSON.parse(loggedInUser.role)
};
