import { TokenInterceptor } from './core/interceptor/token.interceptor';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { loadingInterceptor } from './core/interceptor/loading.interceptor';
import { provideToastr } from 'ngx-toastr';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideToastr(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        loadingInterceptor,
        AuthInterceptor,
        TokenInterceptor
      ])
    ),
    provideAnimationsAsync(),
  ]
};
