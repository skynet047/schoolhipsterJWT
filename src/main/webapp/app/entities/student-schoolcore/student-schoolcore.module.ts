import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolhipsterJwtSharedModule } from 'app/shared';
import {
    StudentSchoolcoreComponent,
    StudentSchoolcoreDetailComponent,
    StudentSchoolcoreUpdateComponent,
    StudentSchoolcoreDeletePopupComponent,
    StudentSchoolcoreDeleteDialogComponent,
    studentRoute,
    studentPopupRoute
} from './';

const ENTITY_STATES = [...studentRoute, ...studentPopupRoute];

@NgModule({
    imports: [SchoolhipsterJwtSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StudentSchoolcoreComponent,
        StudentSchoolcoreDetailComponent,
        StudentSchoolcoreUpdateComponent,
        StudentSchoolcoreDeleteDialogComponent,
        StudentSchoolcoreDeletePopupComponent
    ],
    entryComponents: [
        StudentSchoolcoreComponent,
        StudentSchoolcoreUpdateComponent,
        StudentSchoolcoreDeleteDialogComponent,
        StudentSchoolcoreDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolhipsterJwtStudentSchoolcoreModule {}
