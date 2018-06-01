import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PersonSchoolcore } from './person-schoolcore.model';
import { PersonSchoolcorePopupService } from './person-schoolcore-popup.service';
import { PersonSchoolcoreService } from './person-schoolcore.service';

@Component({
    selector: 'jhi-person-schoolcore-delete-dialog',
    templateUrl: './person-schoolcore-delete-dialog.component.html'
})
export class PersonSchoolcoreDeleteDialogComponent {

    person: PersonSchoolcore;

    constructor(
        private personService: PersonSchoolcoreService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.personService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'personListModification',
                content: 'Deleted an person'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-person-schoolcore-delete-popup',
    template: ''
})
export class PersonSchoolcoreDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personPopupService: PersonSchoolcorePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.personPopupService
                .open(PersonSchoolcoreDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
