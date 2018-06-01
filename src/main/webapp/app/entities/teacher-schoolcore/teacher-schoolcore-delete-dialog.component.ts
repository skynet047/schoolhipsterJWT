import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TeacherSchoolcore } from './teacher-schoolcore.model';
import { TeacherSchoolcorePopupService } from './teacher-schoolcore-popup.service';
import { TeacherSchoolcoreService } from './teacher-schoolcore.service';

@Component({
    selector: 'jhi-teacher-schoolcore-delete-dialog',
    templateUrl: './teacher-schoolcore-delete-dialog.component.html'
})
export class TeacherSchoolcoreDeleteDialogComponent {

    teacher: TeacherSchoolcore;

    constructor(
        private teacherService: TeacherSchoolcoreService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.teacherService.delete(id).subscribe((response) => {
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

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private teacherPopupService: TeacherSchoolcorePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.teacherPopupService
                .open(TeacherSchoolcoreDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
