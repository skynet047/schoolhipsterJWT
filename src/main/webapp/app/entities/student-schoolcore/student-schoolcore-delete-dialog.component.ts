import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StudentSchoolcore } from './student-schoolcore.model';
import { StudentSchoolcorePopupService } from './student-schoolcore-popup.service';
import { StudentSchoolcoreService } from './student-schoolcore.service';

@Component({
    selector: 'jhi-student-schoolcore-delete-dialog',
    templateUrl: './student-schoolcore-delete-dialog.component.html'
})
export class StudentSchoolcoreDeleteDialogComponent {

    student: StudentSchoolcore;

    constructor(
        private studentService: StudentSchoolcoreService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.studentService.delete(id).subscribe((response) => {
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

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private studentPopupService: StudentSchoolcorePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.studentPopupService
                .open(StudentSchoolcoreDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
