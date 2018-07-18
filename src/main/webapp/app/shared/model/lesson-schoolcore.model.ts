import { Moment } from 'moment';
import { IStudentSchoolcore } from 'app/shared/model/student-schoolcore.model';

export interface ILessonSchoolcore {
    id?: number;
    plannedStartTime?: Moment;
    plannedEndTime?: Moment;
    realStartDate?: Moment;
    realEndDate?: Moment;
    topic?: string;
    teacherId?: number;
    subjectId?: number;
    students?: IStudentSchoolcore[];
}

export class LessonSchoolcore implements ILessonSchoolcore {
    constructor(
        public id?: number,
        public plannedStartTime?: Moment,
        public plannedEndTime?: Moment,
        public realStartDate?: Moment,
        public realEndDate?: Moment,
        public topic?: string,
        public teacherId?: number,
        public subjectId?: number,
        public students?: IStudentSchoolcore[]
    ) {}
}
