import { BaseEntity } from './../../shared';

export class TeacherSchoolcore implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public phoneNumber?: string,
        public email?: string,
        public hourlyRate?: number,
        public rate?: number,
        public subjects?: BaseEntity[],
        public lessons?: BaseEntity[],
    ) {
    }
}
