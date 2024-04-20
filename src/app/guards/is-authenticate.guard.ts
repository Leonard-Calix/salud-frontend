import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthStatus } from 'app/interfaces/AuthStattusEnum';
import { AuthService } from 'app/services/auth.service';
import { Observable } from 'rxjs';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService._authStatus == AuthStatus.authenticate) {
    return true
  }
/*
  if (authService._authStatus == AuthStatus.checking) {
    router.navigateByUrl('/pages/login');
    return false
  }

*/
  const url = state.url;
  localStorage.setItem('url', url);

  router.navigateByUrl('/pages/login')
  return false;
};
