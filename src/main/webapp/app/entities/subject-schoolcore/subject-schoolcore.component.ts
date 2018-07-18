import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISubjectSchoolcore } from 'app/shared/model/subject-schoolcore.model';
import { Principal } from 'app/core';
import { SubjectSchoolcoreService } from './subject-schoolcore.service';

@Component({
    selector: 'jhi-subject-schoolcore',
    templateUrl: './subject-schoolcore.component.html'
})
export class SubjectSchoolcoreComponent implements OnInit, OnDestroy {
    subjects: ISubjectSchoolcore[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private subjectService: SubjectSchoolcoreService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.subjectService.query().subscribe(
            (res: HttpResponse<ISubjectSchoolcore[]>) => {
                this.subjects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSubjects();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISubjectSchoolcore) {
        return item.id;
    }

    registerChangeInSubjects() {
        this.eventSubscriber = this.eventManager.subscribe('subjectListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
