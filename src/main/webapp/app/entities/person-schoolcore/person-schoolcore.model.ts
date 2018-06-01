import { BaseEntity } from './../../shared';

export const enum Gender {
    'MALE',
    'FEMALE',
    'OTHER'
}

export class PersonSchoolcore implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public gender?: Gender,
        public phoneNumber?: string,
        public email?: string,
    ) {
    }
}
