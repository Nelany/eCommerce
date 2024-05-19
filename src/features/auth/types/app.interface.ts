export interface AddressShipping {
    country: string;
    city: string;
    streetName: string;
    postalCode: string;
}

export interface AddressBilling {
    country: string;
    city: string;
    streetName: string;
    postalCode: string;
}

export interface registerData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateBirth: string;
    addressShipping: AddressShipping;
    addressBilling: AddressBilling;
    showBilling: boolean;
}
