import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolhipsterJwtSharedModule } from '../../shared';
import {
    SubjectSchoolcoreService,
    SubjectSchoolcorePopupService,
    SubjectSchoolcoreComponent,
    SubjectSchoolcoreDetailComponent,
    SubjectSchoolcoreDialogComponent,
    SubjectSchoolcorePopupComponent,
    SubjectSchoolcoreDeletePopupComponent,
    SubjectSchoolcoreDeleteDialogComponent,
    subjectRoute,
    subjectPopupRoute,
} from './';

const ENTITY_STATES = [
    ...subjectRoute,
    ...subjectPopupRoute,
];

@NgModule({
    imports: [
        SchoolhipsterJwtSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SubjectSchoolcoreComponent,
        SubjectSchoolcoreDetailComponent,
        SubjectSchoolcoreDialogComponent,
        SubjectSchoolcoreDeleteDialogComponent,
        SubjectSchoolcorePopupComponent,
        SubjectSchoolcoreDeletePopupComponent,
    ],
    entryComponents: [
        SubjectSchoolcoreComponent,
        SubjectSchoolcoreDialogComponent,
        SubjectSchoolcorePopupComponent,
        SubjectSchoolcoreDeleteDialogComponent,
        SubjectSchoolcoreDeletePopupComponent,
    ],
    providers: [
        SubjectSchoolcoreService,
        SubjectSchoolcorePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolhipsterJwtSubjectSchoolcoreModule {}
