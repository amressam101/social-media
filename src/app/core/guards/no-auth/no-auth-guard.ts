import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const noAuthGuard: CanActivateFn = (route, state) => {
  let platFormId = inject(PLATFORM_ID)
  let router = inject(Router);

  if (isPlatformBrowser(platFormId)) {
    if (localStorage.getItem("token") != null) {
      return router.parseUrl('/home')
    } else {
      return true;
    }
  } else {
    return true;
  }
};
