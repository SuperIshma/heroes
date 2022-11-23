// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { MaterialModule } from 'src/app/material.module';

// Services
import { HeroesService } from 'src/app/services/heroes-service';

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
  providers: [
    HeroesService
  ],
})
export class FormModule { }