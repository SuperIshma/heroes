// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { MaterialModule } from 'src/app/material.module';

// Services
import { HeroesService } from 'src/app/services/heroes-service';

// Components
import { MainComponent } from './main.component';
import { TypeofPipe } from 'src/app/shared/pipes/typeof.pipe';
import { MainRoutingModule } from './main-routing.module';


@NgModule({
  declarations: [
    MainComponent,
    TypeofPipe
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule
  ],
  providers: [],
})
export class MainModule { }