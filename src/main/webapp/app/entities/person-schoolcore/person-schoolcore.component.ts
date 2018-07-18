import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PersonSchoolcore } from './person-schoolcore.model';
import { PersonSchoolcoreService } from './person-schoolcore.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-person-schoolcore',
    templateUrl: './person-schoolcore.component.html'
})
export class PersonSchoolcoreComponent implements OnInit, OnDestroy {
people: PersonSchoolcore[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private personService: PersonSchoolcoreService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.personService.query().subscribe(
            (res: HttpResponse<PersonSchoolcore[]>) => {
                this.people = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPeople();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PersonSchoolcore) {
        return item.id;
    }
    registerChangeInPeople() {
        this.eventSubscriber = this.eventManager.subscribe('personListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
