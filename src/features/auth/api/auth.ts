import { getApiRoot } from '../../../common/api/sdk';
import { UserData } from '../../../common/types';
import { AddressBilling, AddressShipping } from '../types/app.interface';

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
// export const getProject = () => {
//   return getApiRoot().get().execute();
// };
const getCustomers = (email: string) => {
  // пример итогового запроса:
  // https://api.us-central1.gcp.commercetools.com/cool-coders/customers?where=email%3D%22johndoe%40example.com%22
  return getApiRoot()
    .customers()
    .get({ queryArgs: { where: `email="${email}"` } })
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
  return getApiRoot()
    .me()
    .login()
    .post({ body: { email: user.username, password: user.password } })
    .execute();
};

export const auth = {
  login,
  createCustomer,
  getCustomers,
};
