import { ILesson } from 'app/shared/model//lesson.model';

export interface IStudent {
    id?: number;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    lessons?: ILesson[];
}

export class Student implements IStudent {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public phoneNumber?: string,
        public email?: string,
        public lessons?: ILesson[]
    ) {}
}
