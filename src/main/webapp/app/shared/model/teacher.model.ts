import { ISubject } from 'app/shared/model//subject.model';
import { ILesson } from 'app/shared/model//lesson.model';

export interface ITeacher {
    id?: number;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    hourlyRate?: number;
    rate?: number;
    subjects?: ISubject[];
    lessons?: ILesson[];
}

export class Teacher implements ITeacher {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public phoneNumber?: string,
        public email?: string,
        public hourlyRate?: number,
        public rate?: number,
        public subjects?: ISubject[],
        public lessons?: ILesson[]
    ) {}
}
