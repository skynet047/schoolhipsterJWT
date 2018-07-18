import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubjectSchoolcore } from 'app/shared/model/subject-schoolcore.model';

@Component({
    selector: 'jhi-subject-schoolcore-detail',
    templateUrl: './subject-schoolcore-detail.component.html'
})
export class SubjectSchoolcoreDetailComponent implements OnInit {
    subject: ISubjectSchoolcore;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ subject }) => {
            this.subject = subject;
        });
    }

    previousState() {
        window.history.back();
    }
}
