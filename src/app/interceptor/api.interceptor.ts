import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SpinnerService } from '../components/spinner/service/spinner.service';
@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private spinnerSVC: SpinnerService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerSVC.show();
    const fullUrl = `${environment.APIUrl}${request.url}`;
    const cloneRequest = request.clone({
        url: fullUrl
    });
    return next.handle(cloneRequest)
      .pipe(finalize(() => {
        setTimeout(() => {this.spinnerSVC.hide();}, 2000);})) // This timeout is to be able to see the spinner
  }
}