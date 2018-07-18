import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolhipsterJwtSharedModule } from 'app/shared';
import {
    SubjectSchoolcoreComponent,
    SubjectSchoolcoreDetailComponent,
    SubjectSchoolcoreUpdateComponent,
    SubjectSchoolcoreDeletePopupComponent,
    SubjectSchoolcoreDeleteDialogComponent,
    subjectRoute,
    subjectPopupRoute
} from './';

const ENTITY_STATES = [...subjectRoute, ...subjectPopupRoute];

@NgModule({
    imports: [SchoolhipsterJwtSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SubjectSchoolcoreComponent,
        SubjectSchoolcoreDetailComponent,
        SubjectSchoolcoreUpdateComponent,
        SubjectSchoolcoreDeleteDialogComponent,
        SubjectSchoolcoreDeletePopupComponent
    ],
    entryComponents: [
        SubjectSchoolcoreComponent,
        SubjectSchoolcoreUpdateComponent,
        SubjectSchoolcoreDeleteDialogComponent,
        SubjectSchoolcoreDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolhipsterJwtSubjectSchoolcoreModule {}
