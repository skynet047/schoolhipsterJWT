import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SchoolhipsterJwtPersonModule } from './person/person.module';
import { SchoolhipsterJwtTeacherModule } from './teacher/teacher.module';
import { SchoolhipsterJwtStudentModule } from './student/student.module';
import { SchoolhipsterJwtSubjectModule } from './subject/subject.module';
import { SchoolhipsterJwtLessonModule } from './lesson/lesson.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        SchoolhipsterJwtPersonModule,
        SchoolhipsterJwtTeacherModule,
        SchoolhipsterJwtStudentModule,
        SchoolhipsterJwtSubjectModule,
        SchoolhipsterJwtLessonModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolhipsterJwtEntityModule {}
