export const enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
}

export interface IPersonSchoolcore {
    id?: number;
    firstName?: string;
    lastName?: string;
    gender?: Gender;
    phoneNumber?: string;
    email?: string;
}

export class PersonSchoolcore implements IPersonSchoolcore {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public gender?: Gender,
        public phoneNumber?: string,
        public email?: string
    ) {}
}
