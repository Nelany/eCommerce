export interface Address {
    country: string;
    city: string;
    street: string;
    postalCode: string;
}

export interface registerDate {
    name: string;
    lastName: string;
    email: string;
    password: string;
    dateBirth: string;
    address: Address;
}