import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TeacherSchoolcore } from './teacher-schoolcore.model';
import { TeacherSchoolcoreService } from './teacher-schoolcore.service';

@Component({
    selector: 'jhi-teacher-schoolcore-detail',
    templateUrl: './teacher-schoolcore-detail.component.html'
})
export class TeacherSchoolcoreDetailComponent implements OnInit, OnDestroy {

    teacher: TeacherSchoolcore;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private teacherService: TeacherSchoolcoreService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTeachers();
    }

    load(id) {
        this.teacherService.find(id)
            .subscribe((teacherResponse: HttpResponse<TeacherSchoolcore>) => {
                this.teacher = teacherResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTeachers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'teacherListModification',
            (response) => this.load(this.teacher.id)
        );
    }
}
