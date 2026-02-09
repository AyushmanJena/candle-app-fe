import { ApplicationConfig } from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      })
    ),
    provideHttpClient(
      withInterceptors([TokenInterceptor])
    )
  ]
};
