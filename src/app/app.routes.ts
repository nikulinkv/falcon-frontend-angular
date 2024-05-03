import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'test',
    loadChildren: () => import('./app-test/test.module').then(module => module.TestModule)
  },
  // {path: '', redirectTo: 'app-test',pathMatch: 'full'},
  // {path: '**', redirectTo: 'app-test'}
];
