import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { SchoolhipsterJwtSharedLibsModule, SchoolhipsterJwtSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
    imports: [SchoolhipsterJwtSharedLibsModule, SchoolhipsterJwtSharedCommonModule],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent],
    exports: [SchoolhipsterJwtSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolhipsterJwtSharedModule {}
