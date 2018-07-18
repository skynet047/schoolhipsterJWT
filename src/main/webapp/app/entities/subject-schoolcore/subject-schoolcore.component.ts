import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SubjectSchoolcore } from './subject-schoolcore.model';
import { SubjectSchoolcoreService } from './subject-schoolcore.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-subject-schoolcore',
    templateUrl: './subject-schoolcore.component.html'
})
export class SubjectSchoolcoreComponent implements OnInit, OnDestroy {
subjects: SubjectSchoolcore[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private subjectService: SubjectSchoolcoreService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.subjectService.query().subscribe(
            (res: HttpResponse<SubjectSchoolcore[]>) => {
                this.subjects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSubjects();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SubjectSchoolcore) {
        return item.id;
    }
    registerChangeInSubjects() {
        this.eventSubscriber = this.eventManager.subscribe('subjectListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
