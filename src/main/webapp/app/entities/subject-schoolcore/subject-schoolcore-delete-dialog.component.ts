import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubjectSchoolcore } from 'app/shared/model/subject-schoolcore.model';
import { SubjectSchoolcoreService } from './subject-schoolcore.service';

@Component({
    selector: 'jhi-subject-schoolcore-delete-dialog',
    templateUrl: './subject-schoolcore-delete-dialog.component.html'
})
export class SubjectSchoolcoreDeleteDialogComponent {
    subject: ISubjectSchoolcore;

    constructor(
        private subjectService: SubjectSchoolcoreService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.subjectService.delete(id).subscribe(response => {
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
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ subject }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SubjectSchoolcoreDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.subject = subject;
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
