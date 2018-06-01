import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SubjectSchoolcore } from './subject-schoolcore.model';
import { SubjectSchoolcorePopupService } from './subject-schoolcore-popup.service';
import { SubjectSchoolcoreService } from './subject-schoolcore.service';
import { TeacherSchoolcore, TeacherSchoolcoreService } from '../teacher-schoolcore';

@Component({
    selector: 'jhi-subject-schoolcore-dialog',
    templateUrl: './subject-schoolcore-dialog.component.html'
})
export class SubjectSchoolcoreDialogComponent implements OnInit {

    subject: SubjectSchoolcore;
    isSaving: boolean;

    teachers: TeacherSchoolcore[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private subjectService: SubjectSchoolcoreService,
        private teacherService: TeacherSchoolcoreService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.teacherService.query()
            .subscribe((res: HttpResponse<TeacherSchoolcore[]>) => { this.teachers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.subject.id !== undefined) {
            this.subscribeToSaveResponse(
                this.subjectService.update(this.subject));
        } else {
            this.subscribeToSaveResponse(
                this.subjectService.create(this.subject));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SubjectSchoolcore>>) {
        result.subscribe((res: HttpResponse<SubjectSchoolcore>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SubjectSchoolcore) {
        this.eventManager.broadcast({ name: 'subjectListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTeacherById(index: number, item: TeacherSchoolcore) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-subject-schoolcore-popup',
    template: ''
})
export class SubjectSchoolcorePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subjectPopupService: SubjectSchoolcorePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.subjectPopupService
                    .open(SubjectSchoolcoreDialogComponent as Component, params['id']);
            } else {
                this.subjectPopupService
                    .open(SubjectSchoolcoreDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
