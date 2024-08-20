import {ApplicationConfig, EnvironmentProviders, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {LoadingComponent} from "./shared/loading/loading.component";

export const appConfig: { imports: any[]; providers: EnvironmentProviders[] } = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),],
  imports:[LoadingComponent]
};

