import { Component } from '@angular/core';
import { SpinnerService } from './service/spinner.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: [ './spinner.component.scss' ],
})
export class SpinnerComponent {
  public isLoading: Subject<boolean> = this.spinnerSVC.isLoading;

  constructor(private spinnerSVC: SpinnerService) {}
}
