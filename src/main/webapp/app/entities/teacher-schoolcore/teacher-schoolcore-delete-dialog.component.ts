import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITeacherSchoolcore } from 'app/shared/model/teacher-schoolcore.model';
import { TeacherSchoolcoreService } from './teacher-schoolcore.service';

@Component({
    selector: 'jhi-teacher-schoolcore-delete-dialog',
    templateUrl: './teacher-schoolcore-delete-dialog.component.html'
})
export class TeacherSchoolcoreDeleteDialogComponent {
    teacher: ITeacherSchoolcore;

    constructor(
        private teacherService: TeacherSchoolcoreService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.teacherService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'teacherListModification',
                content: 'Deleted an teacher'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-teacher-schoolcore-delete-popup',
    template: ''
})
export class TeacherSchoolcoreDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ teacher }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TeacherSchoolcoreDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.teacher = teacher;
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
