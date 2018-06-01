import { BaseEntity } from './../../shared';

export class StudentSchoolcore implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public phoneNumber?: string,
        public email?: string,
        public lessons?: BaseEntity[],
    ) {
    }
}
