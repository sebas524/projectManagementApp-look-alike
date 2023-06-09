import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const privateGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    map((isLoggedIn) => {
      if (!isLoggedIn) {
        // * so, if not logged in, redirect then apply guard:
        router.navigateByUrl('/home');

        return false;
        // * in other words:CANT ACCESS ROUTE
      }
      // * else, dont apply guard:

      // router.navigateByUrl('/pm/boards');
      // router.navigateByUrl('/auth');

      return true;
    })
  );
};
