import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolhipsterJwtSharedModule } from 'app/shared';
import {
    TeacherSchoolcoreComponent,
    TeacherSchoolcoreDetailComponent,
    TeacherSchoolcoreUpdateComponent,
    TeacherSchoolcoreDeletePopupComponent,
    TeacherSchoolcoreDeleteDialogComponent,
    teacherRoute,
    teacherPopupRoute
} from './';

const ENTITY_STATES = [...teacherRoute, ...teacherPopupRoute];

@NgModule({
    imports: [SchoolhipsterJwtSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TeacherSchoolcoreComponent,
        TeacherSchoolcoreDetailComponent,
        TeacherSchoolcoreUpdateComponent,
        TeacherSchoolcoreDeleteDialogComponent,
        TeacherSchoolcoreDeletePopupComponent
    ],
    entryComponents: [
        TeacherSchoolcoreComponent,
        TeacherSchoolcoreUpdateComponent,
        TeacherSchoolcoreDeleteDialogComponent,
        TeacherSchoolcoreDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolhipsterJwtTeacherSchoolcoreModule {}
