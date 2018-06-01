import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SubjectSchoolcore } from './subject-schoolcore.model';
import { SubjectSchoolcorePopupService } from './subject-schoolcore-popup.service';
import { SubjectSchoolcoreService } from './subject-schoolcore.service';

@Component({
    selector: 'jhi-subject-schoolcore-delete-dialog',
    templateUrl: './subject-schoolcore-delete-dialog.component.html'
})
export class SubjectSchoolcoreDeleteDialogComponent {

    subject: SubjectSchoolcore;

    constructor(
        private subjectService: SubjectSchoolcoreService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.subjectService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'subjectListModification',
                content: 'Deleted an subject'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-subject-schoolcore-delete-popup',
    template: ''
})
export class SubjectSchoolcoreDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subjectPopupService: SubjectSchoolcorePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.subjectPopupService
                .open(SubjectSchoolcoreDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
