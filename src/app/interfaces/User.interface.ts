export default interface User {
    id?: Number;
    firstName: String;
    lastName: String;
    email: String;
    userName: String;
    password: String;
    active: Boolean;
    createdAt: Date;
    updatedAt: Date;
}