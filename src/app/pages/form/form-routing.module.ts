// Core
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { FormComponent } from './form.component';

const routes: Routes = [{ path: '', component: FormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }