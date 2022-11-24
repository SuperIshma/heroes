import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {

  isLoading = new Subject<boolean>();

  constructor() {}

  public show() {
    console.log('showing');
     this.isLoading.next(true);
  }

  public hide() {
    console.log('hiding');
     this.isLoading.next(false);
  }
}
