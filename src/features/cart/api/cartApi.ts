import { getApiRoot } from '../../../common/api/sdk';

export const createCart = (id?: string, email?: string) => {
  return getApiRoot()
    .carts()
    .post({
      body: {
        customerId: id,
        customerEmail: email,
        currency: 'USD',
      },
    })
    .execute();
};

export const getCartById = (id: string) => {
  return getApiRoot()
    .carts().withId({ID: id})
    .get(
    )
    .execute();
};

export const getCartByCustomerId = (id: string) => {
  return getApiRoot()
    .carts().withCustomerId({customerId: id})
    .get(
    )
    .execute();
};