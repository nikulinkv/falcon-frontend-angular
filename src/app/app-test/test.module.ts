import {NgModule, TemplateRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TestRoutes} from "./test.routes";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TestRoutes,
    HttpClientModule
  ]
})
export class TestModule {}
