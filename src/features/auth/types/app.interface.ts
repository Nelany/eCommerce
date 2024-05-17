export interface AddressShipping {
    countryShipping: string;
    cityShipping: string;
    streetShipping: string;
    postalCodeShipping: string;
}

export interface AddressBilling {
    countryBilling: string;
    cityBilling: string;
    streetBilling: string;
    postalCodeBilling: string;
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
