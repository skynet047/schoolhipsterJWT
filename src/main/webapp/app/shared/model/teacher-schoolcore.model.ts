import { ISubjectSchoolcore } from 'app/shared/model/subject-schoolcore.model';
import { ILessonSchoolcore } from 'app/shared/model/lesson-schoolcore.model';

export interface ITeacherSchoolcore {
    id?: number;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    hourlyRate?: number;
    rate?: number;
    subjects?: ISubjectSchoolcore[];
    lessons?: ILessonSchoolcore[];
}

export class TeacherSchoolcore implements ITeacherSchoolcore {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public phoneNumber?: string,
        public email?: string,
        public hourlyRate?: number,
        public rate?: number,
        public subjects?: ISubjectSchoolcore[],
        public lessons?: ILessonSchoolcore[]
    ) {}
}
