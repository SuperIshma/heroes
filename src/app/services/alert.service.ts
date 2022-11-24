import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AlertEvent } from '../interfaces/alert.interface';

@Injectable()
export class AlertService {
    private subject = new Subject<AlertEvent>();

    constructor() {}

    public clear() {
        this.subject.next({type: '', message: ''});
    }

    public error(message: string) {
        this.subject.next({ type: 'error', message });
    }

    public getMessage(): Observable<AlertEvent> {
        return this.subject.asObservable();
    }

    public success(message: string) {
        this.subject.next({ type: 'success', message });
    }
}