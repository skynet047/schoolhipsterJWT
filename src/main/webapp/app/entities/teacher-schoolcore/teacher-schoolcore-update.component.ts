import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITeacherSchoolcore } from 'app/shared/model/teacher-schoolcore.model';
import { TeacherSchoolcoreService } from './teacher-schoolcore.service';
import { ISubjectSchoolcore } from 'app/shared/model/subject-schoolcore.model';
import { SubjectSchoolcoreService } from 'app/entities/subject-schoolcore';

@Component({
    selector: 'jhi-teacher-schoolcore-update',
    templateUrl: './teacher-schoolcore-update.component.html'
})
export class TeacherSchoolcoreUpdateComponent implements OnInit {
    private _teacher: ITeacherSchoolcore;
    isSaving: boolean;

    subjects: ISubjectSchoolcore[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private teacherService: TeacherSchoolcoreService,
        private subjectService: SubjectSchoolcoreService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ teacher }) => {
            this.teacher = teacher;
        });
        this.subjectService.query().subscribe(
            (res: HttpResponse<ISubjectSchoolcore[]>) => {
                this.subjects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.teacher.id !== undefined) {
            this.subscribeToSaveResponse(this.teacherService.update(this.teacher));
        } else {
            this.subscribeToSaveResponse(this.teacherService.create(this.teacher));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITeacherSchoolcore>>) {
        result.subscribe((res: HttpResponse<ITeacherSchoolcore>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSubjectById(index: number, item: ISubjectSchoolcore) {
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
    get teacher() {
        return this._teacher;
    }

    set teacher(teacher: ITeacherSchoolcore) {
        this._teacher = teacher;
    }
}
