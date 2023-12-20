import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const loggedInUser = JSON.parse(localStorage.getItem('cwNewUser')!);
  if(loggedInUser.role === 'Admin'){
    return true
  }else{
    return false
  }
  // return JSON.parse(loggedInUser.role)
};
