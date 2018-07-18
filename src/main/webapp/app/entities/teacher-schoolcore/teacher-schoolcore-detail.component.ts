import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITeacherSchoolcore } from 'app/shared/model/teacher-schoolcore.model';

@Component({
    selector: 'jhi-teacher-schoolcore-detail',
    templateUrl: './teacher-schoolcore-detail.component.html'
})
export class TeacherSchoolcoreDetailComponent implements OnInit {
    teacher: ITeacherSchoolcore;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ teacher }) => {
            this.teacher = teacher;
        });
    }

    previousState() {
        window.history.back();
    }
}
