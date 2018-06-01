import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LessonSchoolcore } from './lesson-schoolcore.model';
import { LessonSchoolcorePopupService } from './lesson-schoolcore-popup.service';
import { LessonSchoolcoreService } from './lesson-schoolcore.service';

@Component({
    selector: 'jhi-lesson-schoolcore-delete-dialog',
    templateUrl: './lesson-schoolcore-delete-dialog.component.html'
})
export class LessonSchoolcoreDeleteDialogComponent {

    lesson: LessonSchoolcore;

    constructor(
        private lessonService: LessonSchoolcoreService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.lessonService.delete(id).subscribe((response) => {
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

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lessonPopupService: LessonSchoolcorePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.lessonPopupService
                .open(LessonSchoolcoreDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
