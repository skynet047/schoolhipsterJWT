import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SchoolhipsterJwtPersonSchoolcoreModule } from './person-schoolcore/person-schoolcore.module';
import { SchoolhipsterJwtTeacherSchoolcoreModule } from './teacher-schoolcore/teacher-schoolcore.module';
import { SchoolhipsterJwtStudentSchoolcoreModule } from './student-schoolcore/student-schoolcore.module';
import { SchoolhipsterJwtSubjectSchoolcoreModule } from './subject-schoolcore/subject-schoolcore.module';
import { SchoolhipsterJwtLessonSchoolcoreModule } from './lesson-schoolcore/lesson-schoolcore.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        SchoolhipsterJwtPersonSchoolcoreModule,
        SchoolhipsterJwtTeacherSchoolcoreModule,
        SchoolhipsterJwtStudentSchoolcoreModule,
        SchoolhipsterJwtSubjectSchoolcoreModule,
        SchoolhipsterJwtLessonSchoolcoreModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolhipsterJwtEntityModule {}
