import { getApiRoot } from '../../../common/api/sdk';
import { UserData } from '../../../common/types';
import { AddressBilling, AddressShipping } from '../types/app.interface';

const getCustomers = (key: string | null) => {
  return getApiRoot()
    .customers()
    .get({ queryArgs: { where: `id="${key}"` } })
    .execute();
};

const createCustomer = (customerData: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
  addresses: [AddressShipping, AddressBilling];
  shippingAddresses: [0];
  billingAddresses: [1];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}) => {
  return getApiRoot().customers().post({ body: customerData }).execute();
};

const login = (user: UserData) => {
  // const body: UserData = {
  //   username: user.username,
  //   password: user.password,
  // };

  // const storedCartData = localStorage.getItem('cartData');

  // if (storedCartData) {
  //   const cartData = JSON.parse(storedCartData);

  //   // body.anonymousCart = { id: cartData.cartId, typeId: 'cart' };
  // }
  console.warn(user);
  return getApiRoot()
    .login()
    .post({
      body: {
        email: user.username,
        password: user.password,
        anonymousCart: user.anonymousCart,
      },
    })
    .execute();
};

export const auth = {
  login,
  createCustomer,
  getCustomers,
};
