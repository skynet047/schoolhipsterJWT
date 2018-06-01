import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PersonSchoolcore } from './person-schoolcore.model';
import { PersonSchoolcoreService } from './person-schoolcore.service';

@Component({
    selector: 'jhi-person-schoolcore-detail',
    templateUrl: './person-schoolcore-detail.component.html'
})
export class PersonSchoolcoreDetailComponent implements OnInit, OnDestroy {

    person: PersonSchoolcore;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private personService: PersonSchoolcoreService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPeople();
    }

    load(id) {
        this.personService.find(id)
            .subscribe((personResponse: HttpResponse<PersonSchoolcore>) => {
                this.person = personResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPeople() {
        this.eventSubscriber = this.eventManager.subscribe(
            'personListModification',
            (response) => this.load(this.person.id)
        );
    }
}
