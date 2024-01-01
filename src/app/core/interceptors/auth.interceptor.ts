import { HttpInterceptorFn } from "@angular/common/http";

export const AuthInterceptor:HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('cwUserToken');
  const request = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  })
  return next(request)
}
