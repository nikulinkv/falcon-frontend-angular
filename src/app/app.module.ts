import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { BlockComponent } from './components/UI/block/block.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppService} from "./services/app.service";
import {MainComponent} from "./components/main/main.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

export function initializeUserService(appService: AppService) {
    return async () => await appService.init()
}

@NgModule({
  declarations: [
    AppComponent,
    BlockComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: initializeUserService, deps: [AppService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
