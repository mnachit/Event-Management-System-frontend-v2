export class UserResponse {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    phone: number;
    email: string;
    password: string;
    roleUser: string;

    constructor(data: any) {
        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.username = data.username;
        this.phone = data.phone;
        this.email = data.email;
        this.password = data.password;
        this.roleUser = data.roleUser;
    }
}
