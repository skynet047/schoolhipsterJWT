import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISubjectSchoolcore } from 'app/shared/model/subject-schoolcore.model';
import { SubjectSchoolcoreService } from './subject-schoolcore.service';
import { ITeacherSchoolcore } from 'app/shared/model/teacher-schoolcore.model';
import { TeacherSchoolcoreService } from 'app/entities/teacher-schoolcore';

@Component({
    selector: 'jhi-subject-schoolcore-update',
    templateUrl: './subject-schoolcore-update.component.html'
})
export class SubjectSchoolcoreUpdateComponent implements OnInit {
    private _subject: ISubjectSchoolcore;
    isSaving: boolean;

    teachers: ITeacherSchoolcore[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private subjectService: SubjectSchoolcoreService,
        private teacherService: TeacherSchoolcoreService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ subject }) => {
            this.subject = subject;
        });
        this.teacherService.query().subscribe(
            (res: HttpResponse<ITeacherSchoolcore[]>) => {
                this.teachers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.subject.id !== undefined) {
            this.subscribeToSaveResponse(this.subjectService.update(this.subject));
        } else {
            this.subscribeToSaveResponse(this.subjectService.create(this.subject));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISubjectSchoolcore>>) {
        result.subscribe((res: HttpResponse<ISubjectSchoolcore>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get subject() {
        return this._subject;
    }

    set subject(subject: ISubjectSchoolcore) {
        this._subject = subject;
    }
}
