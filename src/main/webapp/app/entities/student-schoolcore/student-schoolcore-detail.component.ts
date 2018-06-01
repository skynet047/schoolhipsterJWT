import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StudentSchoolcore } from './student-schoolcore.model';
import { StudentSchoolcoreService } from './student-schoolcore.service';

@Component({
    selector: 'jhi-student-schoolcore-detail',
    templateUrl: './student-schoolcore-detail.component.html'
})
export class StudentSchoolcoreDetailComponent implements OnInit, OnDestroy {

    student: StudentSchoolcore;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private studentService: StudentSchoolcoreService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStudents();
    }

    load(id) {
        this.studentService.find(id)
            .subscribe((studentResponse: HttpResponse<StudentSchoolcore>) => {
                this.student = studentResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStudents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'studentListModification',
            (response) => this.load(this.student.id)
        );
    }
}
