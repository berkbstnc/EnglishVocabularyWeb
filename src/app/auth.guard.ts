import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './authservice';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) 
  {
    router.navigate(['/login']);
    return false;
  }

  const userRole = authService.getUserRole();
  const requiredRoles = route.data['roles'] as Array<string>;

  if (requiredRoles && !requiredRoles.includes(userRole!)) {
    router.navigate(['/welcome']);
    return false;
  }

  return true;

};
