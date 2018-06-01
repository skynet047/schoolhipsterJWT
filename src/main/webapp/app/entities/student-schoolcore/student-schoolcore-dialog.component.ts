import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StudentSchoolcore } from './student-schoolcore.model';
import { StudentSchoolcorePopupService } from './student-schoolcore-popup.service';
import { StudentSchoolcoreService } from './student-schoolcore.service';
import { LessonSchoolcore, LessonSchoolcoreService } from '../lesson-schoolcore';

@Component({
    selector: 'jhi-student-schoolcore-dialog',
    templateUrl: './student-schoolcore-dialog.component.html'
})
export class StudentSchoolcoreDialogComponent implements OnInit {

    student: StudentSchoolcore;
    isSaving: boolean;

    lessons: LessonSchoolcore[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private studentService: StudentSchoolcoreService,
        private lessonService: LessonSchoolcoreService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.lessonService.query()
            .subscribe((res: HttpResponse<LessonSchoolcore[]>) => { this.lessons = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.student.id !== undefined) {
            this.subscribeToSaveResponse(
                this.studentService.update(this.student));
        } else {
            this.subscribeToSaveResponse(
                this.studentService.create(this.student));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StudentSchoolcore>>) {
        result.subscribe((res: HttpResponse<StudentSchoolcore>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: StudentSchoolcore) {
        this.eventManager.broadcast({ name: 'studentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLessonById(index: number, item: LessonSchoolcore) {
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
    selector: 'jhi-student-schoolcore-popup',
    template: ''
})
export class StudentSchoolcorePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private studentPopupService: StudentSchoolcorePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.studentPopupService
                    .open(StudentSchoolcoreDialogComponent as Component, params['id']);
            } else {
                this.studentPopupService
                    .open(StudentSchoolcoreDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
