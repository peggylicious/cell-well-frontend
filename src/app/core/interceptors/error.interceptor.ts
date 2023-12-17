import { HttpErrorResponse, HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, tap, throwError } from 'rxjs';
import { CoreService } from '../services/core.service';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  const core = inject(CoreService)
  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    // Handle HTTP errors globally
    console.error('HTTP error occurred:', error);
    if (error instanceof HttpErrorResponse && error.status === 401) {// Unauthorized user
      router.navigateByUrl('/login');
    }
    if (error instanceof HttpErrorResponse && error.status === 500) {//Server down
      router.navigateByUrl('/login');
    }
    router.navigateByUrl('/login');
    core.openDialog(error.error?.message, 'close')
    return throwError(() => error);

  }));
};
