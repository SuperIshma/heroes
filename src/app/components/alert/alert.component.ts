import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/components/alert/service/alert.service';
import { AlertEvent } from 'src/app/components/alert/alert.interface';

@Component({
    selector: 'app-alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit, OnDestroy {
    public event!: AlertEvent;
    private subscription!: Subscription;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe((event: AlertEvent) => { 
            this.event = event; 
            setTimeout(() => this.alertService.clear(), 5000);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}