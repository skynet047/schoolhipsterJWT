import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolhipsterJwtSharedModule } from '../../shared';
import {
    PersonSchoolcoreService,
    PersonSchoolcorePopupService,
    PersonSchoolcoreComponent,
    PersonSchoolcoreDetailComponent,
    PersonSchoolcoreDialogComponent,
    PersonSchoolcorePopupComponent,
    PersonSchoolcoreDeletePopupComponent,
    PersonSchoolcoreDeleteDialogComponent,
    personRoute,
    personPopupRoute,
} from './';

const ENTITY_STATES = [
    ...personRoute,
    ...personPopupRoute,
];

@NgModule({
    imports: [
        SchoolhipsterJwtSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PersonSchoolcoreComponent,
        PersonSchoolcoreDetailComponent,
        PersonSchoolcoreDialogComponent,
        PersonSchoolcoreDeleteDialogComponent,
        PersonSchoolcorePopupComponent,
        PersonSchoolcoreDeletePopupComponent,
    ],
    entryComponents: [
        PersonSchoolcoreComponent,
        PersonSchoolcoreDialogComponent,
        PersonSchoolcorePopupComponent,
        PersonSchoolcoreDeleteDialogComponent,
        PersonSchoolcoreDeletePopupComponent,
    ],
    providers: [
        PersonSchoolcoreService,
        PersonSchoolcorePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolhipsterJwtPersonSchoolcoreModule {}
