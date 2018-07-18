import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolhipsterJwtSharedModule } from 'app/shared';
import {
    PersonSchoolcoreComponent,
    PersonSchoolcoreDetailComponent,
    PersonSchoolcoreUpdateComponent,
    PersonSchoolcoreDeletePopupComponent,
    PersonSchoolcoreDeleteDialogComponent,
    personRoute,
    personPopupRoute
} from './';

const ENTITY_STATES = [...personRoute, ...personPopupRoute];

@NgModule({
    imports: [SchoolhipsterJwtSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PersonSchoolcoreComponent,
        PersonSchoolcoreDetailComponent,
        PersonSchoolcoreUpdateComponent,
        PersonSchoolcoreDeleteDialogComponent,
        PersonSchoolcoreDeletePopupComponent
    ],
    entryComponents: [
        PersonSchoolcoreComponent,
        PersonSchoolcoreUpdateComponent,
        PersonSchoolcoreDeleteDialogComponent,
        PersonSchoolcoreDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolhipsterJwtPersonSchoolcoreModule {}
