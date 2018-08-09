import { ILesson } from 'app/shared/model//lesson.model';
import { ITeacher } from 'app/shared/model//teacher.model';

export interface ISubject {
    id?: number;
    name?: string;
    lessons?: ILesson[];
    teachers?: ITeacher[];
}

export class Subject implements ISubject {
    constructor(public id?: number, public name?: string, public lessons?: ILesson[], public teachers?: ITeacher[]) {}
}
