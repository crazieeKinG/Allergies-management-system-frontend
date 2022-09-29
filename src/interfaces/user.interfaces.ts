interface UserInterface {
    id: string;
    fullName: string;
    dateOfBirth: moment.Moment;
    gender: string;
    email: string;
    address: string;
}
export type UserToInsert = Omit<UserInterface, "id">;

export interface UserCredentialsInterface {
    email: string;
    password: string;
}

export default UserInterface;
