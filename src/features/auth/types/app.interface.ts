export interface Address {
    country: string;
    city: string;
    street: string;
    postalCode: string;
}

export interface registerData {
    name: string;
    lastName: string;
    email: string;
    password: string;
    dateBirth: string;
    address: Address;
}