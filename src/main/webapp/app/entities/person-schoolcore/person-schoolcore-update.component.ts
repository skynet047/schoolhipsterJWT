import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPersonSchoolcore } from 'app/shared/model/person-schoolcore.model';
import { PersonSchoolcoreService } from './person-schoolcore.service';

@Component({
    selector: 'jhi-person-schoolcore-update',
    templateUrl: './person-schoolcore-update.component.html'
})
export class PersonSchoolcoreUpdateComponent implements OnInit {
    private _person: IPersonSchoolcore;
    isSaving: boolean;

    constructor(private personService: PersonSchoolcoreService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ person }) => {
            this.person = person;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.person.id !== undefined) {
            this.subscribeToSaveResponse(this.personService.update(this.person));
        } else {
            this.subscribeToSaveResponse(this.personService.create(this.person));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPersonSchoolcore>>) {
        result.subscribe((res: HttpResponse<IPersonSchoolcore>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get person() {
        return this._person;
    }

    set person(person: IPersonSchoolcore) {
        this._person = person;
    }
}
