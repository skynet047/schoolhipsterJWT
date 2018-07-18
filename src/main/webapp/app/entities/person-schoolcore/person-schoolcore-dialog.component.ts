import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PersonSchoolcore } from './person-schoolcore.model';
import { PersonSchoolcorePopupService } from './person-schoolcore-popup.service';
import { PersonSchoolcoreService } from './person-schoolcore.service';

@Component({
    selector: 'jhi-person-schoolcore-dialog',
    templateUrl: './person-schoolcore-dialog.component.html'
})
export class PersonSchoolcoreDialogComponent implements OnInit {

    person: PersonSchoolcore;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private personService: PersonSchoolcoreService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.person.id !== undefined) {
            this.subscribeToSaveResponse(
                this.personService.update(this.person));
        } else {
            this.subscribeToSaveResponse(
                this.personService.create(this.person));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PersonSchoolcore>>) {
        result.subscribe((res: HttpResponse<PersonSchoolcore>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PersonSchoolcore) {
        this.eventManager.broadcast({ name: 'personListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-person-schoolcore-popup',
    template: ''
})
export class PersonSchoolcorePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personPopupService: PersonSchoolcorePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.personPopupService
                    .open(PersonSchoolcoreDialogComponent as Component, params['id']);
            } else {
                this.personPopupService
                    .open(PersonSchoolcoreDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
