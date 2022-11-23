import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)},
  {path: 'form', loadChildren: () => import('./pages/form/form.module').then(m => m.FormModule)},
  {path: '**', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
