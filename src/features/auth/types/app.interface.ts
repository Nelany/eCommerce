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
    defaultShipping: boolean;
    defaultBilling: boolean;
    defaultShippingAddress?: number,
    defaultBillingAddress?: number,
}

export interface updateData {
    firstName: string | undefined,
    lastName: string | undefined,
    dateBirth: string | undefined,
    email: string | undefined
}

export interface updatePasswordData {
    currentPassword: string,
    newPassword: string,
    version: number,
}

export interface addAddress {
    country: string;
    city: string;
    streetName: string;
    postalCode: string;
}

export interface AddressResponse {
    country?: string | undefined;
    city?: string | undefined;
    streetName?: string | undefined;
    postalCode?: string | undefined;
}
