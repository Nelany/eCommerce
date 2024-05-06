import { apiRoot } from '../../../common/api/sdk';

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
export const getProject = () => {
  return apiRoot.get().execute();
};
export const getCustomers = (email: string) => {
  // пример итогового запроса:
  // https://api.us-central1.gcp.commercetools.com/cool-coders/customers?where=email%3D%22johndoe%40example.com%22
  return apiRoot
    .customers()
    .get({ queryArgs: { where: `email="${email}"` } })
    .execute();
};

export const createCustomer = (customerData: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}) => {
  return apiRoot.customers().post({ body: customerData }).execute();
};
