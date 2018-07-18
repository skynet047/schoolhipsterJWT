import { ILessonSchoolcore } from 'app/shared/model/lesson-schoolcore.model';

export interface IStudentSchoolcore {
    id?: number;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    lessons?: ILessonSchoolcore[];
}

export class StudentSchoolcore implements IStudentSchoolcore {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public phoneNumber?: string,
        public email?: string,
        public lessons?: ILessonSchoolcore[]
    ) {}
}
