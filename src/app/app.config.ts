import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom, TemplateRef} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {routes} from "./app.routes";
import {AppService} from "./app-test/services/app.service";
import {provideHttpClient} from "@angular/common/http";
import {Chart} from "chart.js";

export function initializeUserService(appService: AppService) {
  return (): Promise<any> => appService.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom([BrowserAnimationsModule, Chart]),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeUserService,
      deps: [AppService],
      multi: true
    }
  ]
};
