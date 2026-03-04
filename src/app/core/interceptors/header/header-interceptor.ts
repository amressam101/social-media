import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let platFormId = inject(PLATFORM_ID)
  if (isPlatformBrowser(platFormId)) {
    if (!req.url.includes("signin") || !req.url.includes('signup')) {
      if (localStorage.getItem("token")) {
        req = req.clone({
          setHeaders: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
      }
    }
  }
  return next(req);
};
