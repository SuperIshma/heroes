import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormComponent } from './form.component';
import { FormRoutingModule } from './form-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AllCapsDirective } from 'src/app/shared/directives/allCaps';

@NgModule({
  declarations: [
    FormComponent,
    AllCapsDirective
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
})
export class FormModule { }