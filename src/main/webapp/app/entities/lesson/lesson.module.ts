import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolhipsterJwtSharedModule } from 'app/shared';
import {
    LessonComponent,
    LessonDetailComponent,
    LessonUpdateComponent,
    LessonDeletePopupComponent,
    LessonDeleteDialogComponent,
    lessonRoute,
    lessonPopupRoute
} from './';

const ENTITY_STATES = [...lessonRoute, ...lessonPopupRoute];

@NgModule({
    imports: [SchoolhipsterJwtSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [LessonComponent, LessonDetailComponent, LessonUpdateComponent, LessonDeleteDialogComponent, LessonDeletePopupComponent],
    entryComponents: [LessonComponent, LessonUpdateComponent, LessonDeleteDialogComponent, LessonDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolhipsterJwtLessonModule {}
