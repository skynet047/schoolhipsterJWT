import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILessonSchoolcore } from 'app/shared/model/lesson-schoolcore.model';
import { LessonSchoolcoreService } from './lesson-schoolcore.service';

@Component({
    selector: 'jhi-lesson-schoolcore-delete-dialog',
    templateUrl: './lesson-schoolcore-delete-dialog.component.html'
})
export class LessonSchoolcoreDeleteDialogComponent {
    lesson: ILessonSchoolcore;

    constructor(
        private lessonService: LessonSchoolcoreService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.lessonService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'lessonListModification',
                content: 'Deleted an lesson'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-lesson-schoolcore-delete-popup',
    template: ''
})
export class LessonSchoolcoreDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ lesson }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LessonSchoolcoreDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.lesson = lesson;
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
