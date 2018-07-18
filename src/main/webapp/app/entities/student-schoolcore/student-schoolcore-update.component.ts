import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IStudentSchoolcore } from 'app/shared/model/student-schoolcore.model';
import { StudentSchoolcoreService } from './student-schoolcore.service';
import { ILessonSchoolcore } from 'app/shared/model/lesson-schoolcore.model';
import { LessonSchoolcoreService } from 'app/entities/lesson-schoolcore';

@Component({
    selector: 'jhi-student-schoolcore-update',
    templateUrl: './student-schoolcore-update.component.html'
})
export class StudentSchoolcoreUpdateComponent implements OnInit {
    private _student: IStudentSchoolcore;
    isSaving: boolean;

    lessons: ILessonSchoolcore[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private studentService: StudentSchoolcoreService,
        private lessonService: LessonSchoolcoreService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ student }) => {
            this.student = student;
        });
        this.lessonService.query().subscribe(
            (res: HttpResponse<ILessonSchoolcore[]>) => {
                this.lessons = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.student.id !== undefined) {
            this.subscribeToSaveResponse(this.studentService.update(this.student));
        } else {
            this.subscribeToSaveResponse(this.studentService.create(this.student));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStudentSchoolcore>>) {
        result.subscribe((res: HttpResponse<IStudentSchoolcore>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackLessonById(index: number, item: ILessonSchoolcore) {
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
    get student() {
        return this._student;
    }

    set student(student: IStudentSchoolcore) {
        this._student = student;
    }
}
