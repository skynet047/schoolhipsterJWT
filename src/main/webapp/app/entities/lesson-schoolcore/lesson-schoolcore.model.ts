import { BaseEntity } from './../../shared';

export class LessonSchoolcore implements BaseEntity {
    constructor(
        public id?: number,
        public plannedStartTime?: any,
        public plannedEndTime?: any,
        public realStartDate?: any,
        public realEndDate?: any,
        public topic?: string,
        public teacherId?: number,
        public subjectId?: number,
        public students?: BaseEntity[],
    ) {
    }
}
