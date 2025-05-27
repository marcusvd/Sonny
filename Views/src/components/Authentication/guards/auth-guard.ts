import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';


export const  authGuard: CanActivateFn = (route, state)=> {

  // const authService = inject(AuthService);

  const router = inject(Router);

  // return authService.isAuthenticated() ? true : router.createUrlTree(['/login']);

  return true; // Placeholder for actual authentication logic
}
