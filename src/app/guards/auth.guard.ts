import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Só executa no client
  if (typeof window === 'undefined') {
    return false;
  }

  const token = localStorage.getItem('token');

  // Se não tem token, redireciona para login
  if (!token) {
    if (state.url !== '/admin/login') {
      router.navigate(['/admin/login']);
    }
    return false;
  }

  // Se tem token, libera acesso
  return true;
};
