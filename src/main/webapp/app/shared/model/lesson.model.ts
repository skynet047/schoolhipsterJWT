import { Moment } from 'moment';
import { IStudent } from 'app/shared/model//student.model';

export interface ILesson {
    id?: number;
    plannedStartTime?: Moment;
    plannedEndTime?: Moment;
    realStartDate?: Moment;
    realEndDate?: Moment;
    topic?: string;
    teacherId?: number;
    subjectId?: number;
    students?: IStudent[];
}

export class Lesson implements ILesson {
    constructor(
        public id?: number,
        public plannedStartTime?: Moment,
        public plannedEndTime?: Moment,
        public realStartDate?: Moment,
        public realEndDate?: Moment,
        public topic?: string,
        public teacherId?: number,
        public subjectId?: number,
        public students?: IStudent[]
    ) {}
}
