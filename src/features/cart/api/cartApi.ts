import { getApiRoot } from '../../../common/api/sdk';

export interface CreateCart {
  id?: string;
  email?: string;
  productId?: string;
}

const createCart = ({ id, email, productId }: CreateCart) => {
  return getApiRoot()
    .carts()
    .post({
      body: {
        customerId: id,
        customerEmail: email,
        currency: 'USD',
        lineItems: [
          {
            productId,
          },
        ],
      },
    })
    .execute();
};

const getCartById = (id: string) => {
  return getApiRoot().carts().withId({ ID: id }).get().execute();
};

const getCartByCustomerId = (id: string) => {
  return getApiRoot()
    .carts()
    .withCustomerId({ customerId: id })
    .get()
    .execute();
};

export interface UpdateCartByIdData {
  id: string;
  version: number;
  customerId?: string;
  email?: string;
  productId?: string;
  quantity?: number;
}

const updateCartById = ({
  id,
  version,
  customerId,
  email,
  productId,
  quantity,
}: UpdateCartByIdData) => {
  return getApiRoot()
    .carts()
    .withId({ ID: id })
    .post({
      body: {
        actions: [
          {
            action: 'setCustomerId',
            customerId: customerId,
          },
          {
            action: 'setCustomerEmail',
            email: email,
          },
          {
            action: 'addLineItem',
            productId: productId,
            quantity: quantity || 1,
          },
        ],
        version: version,
      },
    })
    .execute();
};

export const cartApi = {
  createCart,
  getCartById,
  getCartByCustomerId,
  updateCartById,
};
