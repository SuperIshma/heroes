// Core
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { MainComponent } from './main.component';

const routes: Routes = [{ path: '', component: MainComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
