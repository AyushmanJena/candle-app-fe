import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MockAuthService } from '../mock/mock-auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(MockAuthService);

  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login']);

  return false;
};
