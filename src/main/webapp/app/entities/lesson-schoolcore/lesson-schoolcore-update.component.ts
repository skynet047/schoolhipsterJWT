import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ILessonSchoolcore } from 'app/shared/model/lesson-schoolcore.model';
import { LessonSchoolcoreService } from './lesson-schoolcore.service';
import { ITeacherSchoolcore } from 'app/shared/model/teacher-schoolcore.model';
import { TeacherSchoolcoreService } from 'app/entities/teacher-schoolcore';
import { ISubjectSchoolcore } from 'app/shared/model/subject-schoolcore.model';
import { SubjectSchoolcoreService } from 'app/entities/subject-schoolcore';
import { IStudentSchoolcore } from 'app/shared/model/student-schoolcore.model';
import { StudentSchoolcoreService } from 'app/entities/student-schoolcore';

@Component({
    selector: 'jhi-lesson-schoolcore-update',
    templateUrl: './lesson-schoolcore-update.component.html'
})
export class LessonSchoolcoreUpdateComponent implements OnInit {
    private _lesson: ILessonSchoolcore;
    isSaving: boolean;

    teachers: ITeacherSchoolcore[];

    subjects: ISubjectSchoolcore[];

    students: IStudentSchoolcore[];
    plannedStartTime: string;
    plannedEndTime: string;
    realStartDate: string;
    realEndDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private lessonService: LessonSchoolcoreService,
        private teacherService: TeacherSchoolcoreService,
        private subjectService: SubjectSchoolcoreService,
        private studentService: StudentSchoolcoreService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ lesson }) => {
            this.lesson = lesson;
        });
        this.teacherService.query().subscribe(
            (res: HttpResponse<ITeacherSchoolcore[]>) => {
                this.teachers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.subjectService.query().subscribe(
            (res: HttpResponse<ISubjectSchoolcore[]>) => {
                this.subjects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.studentService.query().subscribe(
            (res: HttpResponse<IStudentSchoolcore[]>) => {
                this.students = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.lesson.plannedStartTime = moment(this.plannedStartTime, DATE_TIME_FORMAT);
        this.lesson.plannedEndTime = moment(this.plannedEndTime, DATE_TIME_FORMAT);
        this.lesson.realStartDate = moment(this.realStartDate, DATE_TIME_FORMAT);
        this.lesson.realEndDate = moment(this.realEndDate, DATE_TIME_FORMAT);
        if (this.lesson.id !== undefined) {
            this.subscribeToSaveResponse(this.lessonService.update(this.lesson));
        } else {
            this.subscribeToSaveResponse(this.lessonService.create(this.lesson));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILessonSchoolcore>>) {
        result.subscribe((res: HttpResponse<ILessonSchoolcore>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTeacherById(index: number, item: ITeacherSchoolcore) {
        return item.id;
    }

    trackSubjectById(index: number, item: ISubjectSchoolcore) {
        return item.id;
    }

    trackStudentById(index: number, item: IStudentSchoolcore) {
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
    get lesson() {
        return this._lesson;
    }

    set lesson(lesson: ILessonSchoolcore) {
        this._lesson = lesson;
        this.plannedStartTime = moment(lesson.plannedStartTime).format(DATE_TIME_FORMAT);
        this.plannedEndTime = moment(lesson.plannedEndTime).format(DATE_TIME_FORMAT);
        this.realStartDate = moment(lesson.realStartDate).format(DATE_TIME_FORMAT);
        this.realEndDate = moment(lesson.realEndDate).format(DATE_TIME_FORMAT);
    }
}
