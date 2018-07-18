import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TeacherSchoolcore } from './teacher-schoolcore.model';
import { TeacherSchoolcorePopupService } from './teacher-schoolcore-popup.service';
import { TeacherSchoolcoreService } from './teacher-schoolcore.service';
import { SubjectSchoolcore, SubjectSchoolcoreService } from '../subject-schoolcore';

@Component({
    selector: 'jhi-teacher-schoolcore-dialog',
    templateUrl: './teacher-schoolcore-dialog.component.html'
})
export class TeacherSchoolcoreDialogComponent implements OnInit {

    teacher: TeacherSchoolcore;
    isSaving: boolean;

    subjects: SubjectSchoolcore[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private teacherService: TeacherSchoolcoreService,
        private subjectService: SubjectSchoolcoreService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.subjectService.query()
            .subscribe((res: HttpResponse<SubjectSchoolcore[]>) => { this.subjects = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.teacher.id !== undefined) {
            this.subscribeToSaveResponse(
                this.teacherService.update(this.teacher));
        } else {
            this.subscribeToSaveResponse(
                this.teacherService.create(this.teacher));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TeacherSchoolcore>>) {
        result.subscribe((res: HttpResponse<TeacherSchoolcore>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TeacherSchoolcore) {
        this.eventManager.broadcast({ name: 'teacherListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSubjectById(index: number, item: SubjectSchoolcore) {
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
    selector: 'jhi-teacher-schoolcore-popup',
    template: ''
})
export class TeacherSchoolcorePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private teacherPopupService: TeacherSchoolcorePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.teacherPopupService
                    .open(TeacherSchoolcoreDialogComponent as Component, params['id']);
            } else {
                this.teacherPopupService
                    .open(TeacherSchoolcoreDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
