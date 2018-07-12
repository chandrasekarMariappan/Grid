import { Subscription } from 'rxjs/Rx';
import { IPosRep, PosRepService } from '../service/posRep.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    template: `<tabel *ngIf="posRepSession"></tabel>`
})
export class TabelWrapperComponent implements OnInit, OnDestroy {
    public posRepSession: IPosRep;

    public subscriptions: Subscription;

    constructor(private posRepService: PosRepService) { }

    public ngOnInit() {
        this.subscriptions = this.posRepService.session.subscribe((session) => this.posRepSession = session);
    }

    public ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
