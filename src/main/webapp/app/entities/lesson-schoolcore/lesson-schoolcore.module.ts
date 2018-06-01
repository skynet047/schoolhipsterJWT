import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolhipsterJwtSharedModule } from '../../shared';
import {
    LessonSchoolcoreService,
    LessonSchoolcorePopupService,
    LessonSchoolcoreComponent,
    LessonSchoolcoreDetailComponent,
    LessonSchoolcoreDialogComponent,
    LessonSchoolcorePopupComponent,
    LessonSchoolcoreDeletePopupComponent,
    LessonSchoolcoreDeleteDialogComponent,
    lessonRoute,
    lessonPopupRoute,
    LessonSchoolcoreResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...lessonRoute,
    ...lessonPopupRoute,
];

@NgModule({
    imports: [
        SchoolhipsterJwtSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LessonSchoolcoreComponent,
        LessonSchoolcoreDetailComponent,
        LessonSchoolcoreDialogComponent,
        LessonSchoolcoreDeleteDialogComponent,
        LessonSchoolcorePopupComponent,
        LessonSchoolcoreDeletePopupComponent,
    ],
    entryComponents: [
        LessonSchoolcoreComponent,
        LessonSchoolcoreDialogComponent,
        LessonSchoolcorePopupComponent,
        LessonSchoolcoreDeleteDialogComponent,
        LessonSchoolcoreDeletePopupComponent,
    ],
    providers: [
        LessonSchoolcoreService,
        LessonSchoolcorePopupService,
        LessonSchoolcoreResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolhipsterJwtLessonSchoolcoreModule {}
