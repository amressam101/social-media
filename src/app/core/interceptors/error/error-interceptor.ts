import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let toastr = inject(ToastrService)
  // REQSUET
  return next(req).pipe(catchError(err => {
    console.log("error from interceptor :", err);
    toastr.error(err.error.message, 'Route Linked Posts')

    return throwError(() => err)
  }));// RESPONSE

};
