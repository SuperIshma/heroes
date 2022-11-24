import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { ApiInterceptor } from './interceptor/api.interceptor';
import { HeroesService } from './services/heroes-service';
import { AlertService } from './components/alert/service/alert.service';
import { AlertComponent } from './components/alert/alert.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlEs } from './pages/main/paginator-es';

@NgModule({
  declarations: [
    AlertComponent,
    AppComponent,
    DialogComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    AlertService,
    HeroesService,
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: {}},
    {provide: MatPaginatorIntl, useClass: MatPaginatorIntlEs},
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
