// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { MaterialModule } from 'src/app/material.module';

// Components
import { FormComponent } from './form.component';
import { FormRoutingModule } from './form-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormComponent
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