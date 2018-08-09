export const enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
}

export interface IPerson {
    id?: number;
    firstName?: string;
    lastName?: string;
    gender?: Gender;
    phoneNumber?: string;
    email?: string;
}

export class Person implements IPerson {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public gender?: Gender,
        public phoneNumber?: string,
        public email?: string
    ) {}
}
