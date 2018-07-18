import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPersonSchoolcore } from 'app/shared/model/person-schoolcore.model';
import { PersonSchoolcoreService } from './person-schoolcore.service';

@Component({
    selector: 'jhi-person-schoolcore-delete-dialog',
    templateUrl: './person-schoolcore-delete-dialog.component.html'
})
export class PersonSchoolcoreDeleteDialogComponent {
    person: IPersonSchoolcore;

    constructor(
        private personService: PersonSchoolcoreService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.personService.delete(id).subscribe(response => {
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
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ person }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PersonSchoolcoreDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.person = person;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
