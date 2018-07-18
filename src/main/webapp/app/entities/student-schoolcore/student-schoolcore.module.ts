import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolhipsterJwtSharedModule } from '../../shared';
import {
    StudentSchoolcoreService,
    StudentSchoolcorePopupService,
    StudentSchoolcoreComponent,
    StudentSchoolcoreDetailComponent,
    StudentSchoolcoreDialogComponent,
    StudentSchoolcorePopupComponent,
    StudentSchoolcoreDeletePopupComponent,
    StudentSchoolcoreDeleteDialogComponent,
    studentRoute,
    studentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...studentRoute,
    ...studentPopupRoute,
];

@NgModule({
    imports: [
        SchoolhipsterJwtSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StudentSchoolcoreComponent,
        StudentSchoolcoreDetailComponent,
        StudentSchoolcoreDialogComponent,
        StudentSchoolcoreDeleteDialogComponent,
        StudentSchoolcorePopupComponent,
        StudentSchoolcoreDeletePopupComponent,
    ],
    entryComponents: [
        StudentSchoolcoreComponent,
        StudentSchoolcoreDialogComponent,
        StudentSchoolcorePopupComponent,
        StudentSchoolcoreDeleteDialogComponent,
        StudentSchoolcoreDeletePopupComponent,
    ],
    providers: [
        StudentSchoolcoreService,
        StudentSchoolcorePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolhipsterJwtStudentSchoolcoreModule {}
