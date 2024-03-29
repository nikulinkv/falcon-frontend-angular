import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BlockComponent} from "./components/UI/block/block.component";

export const routes: Routes = [
  {
    path: 'blocks/:company/:tab/:order',
    component: BlockComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
