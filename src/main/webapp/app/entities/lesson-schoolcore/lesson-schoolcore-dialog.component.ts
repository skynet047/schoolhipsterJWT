import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LessonSchoolcore } from './lesson-schoolcore.model';
import { LessonSchoolcorePopupService } from './lesson-schoolcore-popup.service';
import { LessonSchoolcoreService } from './lesson-schoolcore.service';
import { TeacherSchoolcore, TeacherSchoolcoreService } from '../teacher-schoolcore';
import { SubjectSchoolcore, SubjectSchoolcoreService } from '../subject-schoolcore';
import { StudentSchoolcore, StudentSchoolcoreService } from '../student-schoolcore';

@Component({
    selector: 'jhi-lesson-schoolcore-dialog',
    templateUrl: './lesson-schoolcore-dialog.component.html'
})
export class LessonSchoolcoreDialogComponent implements OnInit {

    lesson: LessonSchoolcore;
    isSaving: boolean;

    teachers: TeacherSchoolcore[];

    subjects: SubjectSchoolcore[];

    students: StudentSchoolcore[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private lessonService: LessonSchoolcoreService,
        private teacherService: TeacherSchoolcoreService,
        private subjectService: SubjectSchoolcoreService,
        private studentService: StudentSchoolcoreService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.teacherService.query()
            .subscribe((res: HttpResponse<TeacherSchoolcore[]>) => { this.teachers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.subjectService.query()
            .subscribe((res: HttpResponse<SubjectSchoolcore[]>) => { this.subjects = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.studentService.query()
            .subscribe((res: HttpResponse<StudentSchoolcore[]>) => { this.students = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.lesson.id !== undefined) {
            this.subscribeToSaveResponse(
                this.lessonService.update(this.lesson));
        } else {
            this.subscribeToSaveResponse(
                this.lessonService.create(this.lesson));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LessonSchoolcore>>) {
        result.subscribe((res: HttpResponse<LessonSchoolcore>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LessonSchoolcore) {
        this.eventManager.broadcast({ name: 'lessonListModification', content: 'OK'});
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

    trackSubjectById(index: number, item: SubjectSchoolcore) {
        return item.id;
    }

    trackStudentById(index: number, item: StudentSchoolcore) {
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
    selector: 'jhi-lesson-schoolcore-popup',
    template: ''
})
export class LessonSchoolcorePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lessonPopupService: LessonSchoolcorePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.lessonPopupService
                    .open(LessonSchoolcoreDialogComponent as Component, params['id']);
            } else {
                this.lessonPopupService
                    .open(LessonSchoolcoreDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
