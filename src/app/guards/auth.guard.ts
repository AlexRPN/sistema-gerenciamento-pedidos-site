import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const token = localStorage.getItem('token');

  if(!token){
    if (state.url !== '/admin/login') {
      router.navigate(['/admin/login']);
    }
    return false;
  }

  return true;
};
