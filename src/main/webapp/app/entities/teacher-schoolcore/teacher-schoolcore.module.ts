import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolhipsterJwtSharedModule } from '../../shared';
import {
    TeacherSchoolcoreService,
    TeacherSchoolcorePopupService,
    TeacherSchoolcoreComponent,
    TeacherSchoolcoreDetailComponent,
    TeacherSchoolcoreDialogComponent,
    TeacherSchoolcorePopupComponent,
    TeacherSchoolcoreDeletePopupComponent,
    TeacherSchoolcoreDeleteDialogComponent,
    teacherRoute,
    teacherPopupRoute,
} from './';

const ENTITY_STATES = [
    ...teacherRoute,
    ...teacherPopupRoute,
];

@NgModule({
    imports: [
        SchoolhipsterJwtSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TeacherSchoolcoreComponent,
        TeacherSchoolcoreDetailComponent,
        TeacherSchoolcoreDialogComponent,
        TeacherSchoolcoreDeleteDialogComponent,
        TeacherSchoolcorePopupComponent,
        TeacherSchoolcoreDeletePopupComponent,
    ],
    entryComponents: [
        TeacherSchoolcoreComponent,
        TeacherSchoolcoreDialogComponent,
        TeacherSchoolcorePopupComponent,
        TeacherSchoolcoreDeleteDialogComponent,
        TeacherSchoolcoreDeletePopupComponent,
    ],
    providers: [
        TeacherSchoolcoreService,
        TeacherSchoolcorePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolhipsterJwtTeacherSchoolcoreModule {}
