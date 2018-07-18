import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILessonSchoolcore } from 'app/shared/model/lesson-schoolcore.model';

@Component({
    selector: 'jhi-lesson-schoolcore-detail',
    templateUrl: './lesson-schoolcore-detail.component.html'
})
export class LessonSchoolcoreDetailComponent implements OnInit {
    lesson: ILessonSchoolcore;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ lesson }) => {
            this.lesson = lesson;
        });
    }

    previousState() {
        window.history.back();
    }
}
