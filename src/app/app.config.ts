import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenExpiredInterceptor } from './interceptors/token-expired.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideCharts(withDefaultRegisterables()),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideHttpClient(
    withInterceptors([tokenExpiredInterceptor])

  )]
};
