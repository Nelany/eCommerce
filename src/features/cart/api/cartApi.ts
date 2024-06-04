import { getApiRoot } from '../../../common/api/sdk';

export const createCart = (id: string, email: string) => {
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
