import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { LessonSchoolcore } from './lesson-schoolcore.model';
import { LessonSchoolcoreService } from './lesson-schoolcore.service';

@Component({
    selector: 'jhi-lesson-schoolcore-detail',
    templateUrl: './lesson-schoolcore-detail.component.html'
})
export class LessonSchoolcoreDetailComponent implements OnInit, OnDestroy {

    lesson: LessonSchoolcore;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private lessonService: LessonSchoolcoreService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLessons();
    }

    load(id) {
        this.lessonService.find(id)
            .subscribe((lessonResponse: HttpResponse<LessonSchoolcore>) => {
                this.lesson = lessonResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLessons() {
        this.eventSubscriber = this.eventManager.subscribe(
            'lessonListModification',
            (response) => this.load(this.lesson.id)
        );
    }
}
