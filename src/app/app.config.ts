import { ApplicationConfig, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

// Importações necessárias para configuração do locale
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { tokenInterceptor } from './interceptors/token.interceptor';

// Registra o locale
registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideToastr(),
    { provide: LOCALE_ID, useValue: 'pt-BR' } // Configura o locale padrão
  ]
};
