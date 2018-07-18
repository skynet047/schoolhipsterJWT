import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStudentSchoolcore } from 'app/shared/model/student-schoolcore.model';

@Component({
    selector: 'jhi-student-schoolcore-detail',
    templateUrl: './student-schoolcore-detail.component.html'
})
export class StudentSchoolcoreDetailComponent implements OnInit {
    student: IStudentSchoolcore;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ student }) => {
            this.student = student;
        });
    }

    previousState() {
        window.history.back();
    }
}
