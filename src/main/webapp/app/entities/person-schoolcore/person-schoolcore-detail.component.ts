import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPersonSchoolcore } from 'app/shared/model/person-schoolcore.model';

@Component({
    selector: 'jhi-person-schoolcore-detail',
    templateUrl: './person-schoolcore-detail.component.html'
})
export class PersonSchoolcoreDetailComponent implements OnInit {
    person: IPersonSchoolcore;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ person }) => {
            this.person = person;
        });
    }

    previousState() {
        window.history.back();
    }
}
