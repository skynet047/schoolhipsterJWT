import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SubjectSchoolcore } from './subject-schoolcore.model';
import { SubjectSchoolcoreService } from './subject-schoolcore.service';

@Component({
    selector: 'jhi-subject-schoolcore-detail',
    templateUrl: './subject-schoolcore-detail.component.html'
})
export class SubjectSchoolcoreDetailComponent implements OnInit, OnDestroy {

    subject: SubjectSchoolcore;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private subjectService: SubjectSchoolcoreService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSubjects();
    }

    load(id) {
        this.subjectService.find(id)
            .subscribe((subjectResponse: HttpResponse<SubjectSchoolcore>) => {
                this.subject = subjectResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSubjects() {
        this.eventSubscriber = this.eventManager.subscribe(
            'subjectListModification',
            (response) => this.load(this.subject.id)
        );
    }
}
