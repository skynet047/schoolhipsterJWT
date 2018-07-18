import { ILessonSchoolcore } from 'app/shared/model/lesson-schoolcore.model';
import { ITeacherSchoolcore } from 'app/shared/model/teacher-schoolcore.model';

export interface ISubjectSchoolcore {
    id?: number;
    name?: string;
    lessons?: ILessonSchoolcore[];
    teachers?: ITeacherSchoolcore[];
}

export class SubjectSchoolcore implements ISubjectSchoolcore {
    constructor(public id?: number, public name?: string, public lessons?: ILessonSchoolcore[], public teachers?: ITeacherSchoolcore[]) {}
}
