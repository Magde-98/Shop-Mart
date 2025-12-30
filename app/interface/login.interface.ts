export interface Ilogin {
    email: string,
    password: string
}

export interface Register extends Ilogin {
    rePassword: string;
    phone: string;
}
