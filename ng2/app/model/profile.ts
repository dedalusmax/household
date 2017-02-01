/** This class represents data model of user information. */
export class Profile {
    id: string;
    username: string;
    password: string;
    email: string;
    displayName: string;
    baseCurrency: string;
    language: string;
    createdDate: Date;
    lastLoginDate: Date;
}