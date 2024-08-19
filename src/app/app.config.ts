import {ApplicationConfig, EnvironmentProviders, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {LoadingComponent} from "./shared/loading/loading.component";

export const appConfig: { bootstrap: any[]; providers: EnvironmentProviders[] } = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),],
  bootstrap: [LoadingComponent]
};

