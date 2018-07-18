import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolhipsterJwtSharedModule } from 'app/shared';
import {
    LessonSchoolcoreComponent,
    LessonSchoolcoreDetailComponent,
    LessonSchoolcoreUpdateComponent,
    LessonSchoolcoreDeletePopupComponent,
    LessonSchoolcoreDeleteDialogComponent,
    lessonRoute,
    lessonPopupRoute
} from './';

const ENTITY_STATES = [...lessonRoute, ...lessonPopupRoute];

@NgModule({
    imports: [SchoolhipsterJwtSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LessonSchoolcoreComponent,
        LessonSchoolcoreDetailComponent,
        LessonSchoolcoreUpdateComponent,
        LessonSchoolcoreDeleteDialogComponent,
        LessonSchoolcoreDeletePopupComponent
    ],
    entryComponents: [
        LessonSchoolcoreComponent,
        LessonSchoolcoreUpdateComponent,
        LessonSchoolcoreDeleteDialogComponent,
        LessonSchoolcoreDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolhipsterJwtLessonSchoolcoreModule {}
