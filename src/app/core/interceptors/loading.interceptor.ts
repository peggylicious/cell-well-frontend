import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService)
  // const hideLoading = Inject(LoaderService)

  loaderService.showLoader()
  return next(req).pipe(
    finalize(() => loaderService.hideLoader())
  )
};
