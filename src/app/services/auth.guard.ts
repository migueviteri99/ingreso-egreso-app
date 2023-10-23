import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ɵɵinject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = ɵɵinject(AuthService);


  if (auth.isAuth()) {
    return true;
  } else {
    ɵɵinject(Router).navigate(['/login'])
    return false;
  }
};
