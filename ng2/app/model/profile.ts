/** This class represents data model of user information. */
export class Profile {
    id: string;
    username: string;
    password: string;
    email: string;
    createdDate: Date;
    lastLoginDate: Date;
}