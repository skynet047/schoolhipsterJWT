import { BaseEntity } from './../../shared';

export class SubjectSchoolcore implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public lessons?: BaseEntity[],
        public teachers?: BaseEntity[],
    ) {
    }
}
