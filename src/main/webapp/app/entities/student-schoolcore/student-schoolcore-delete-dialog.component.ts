import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStudentSchoolcore } from 'app/shared/model/student-schoolcore.model';
import { StudentSchoolcoreService } from './student-schoolcore.service';

@Component({
    selector: 'jhi-student-schoolcore-delete-dialog',
    templateUrl: './student-schoolcore-delete-dialog.component.html'
})
export class StudentSchoolcoreDeleteDialogComponent {
    student: IStudentSchoolcore;

    constructor(
        private studentService: StudentSchoolcoreService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.studentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'studentListModification',
                content: 'Deleted an student'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-student-schoolcore-delete-popup',
    template: ''
})
export class StudentSchoolcoreDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ student }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StudentSchoolcoreDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.student = student;
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
