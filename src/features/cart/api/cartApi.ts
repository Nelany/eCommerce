import { CartUpdateAction } from '@commercetools/platform-sdk';
import { getApiRoot } from '../../../common/api/sdk';

export interface CreateCart {
  id?: string;
  email?: string;
  productId?: string;
}

export interface ChangeProduct {
  id: string;
  version: number;
  productId: string;
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

export const getCartById = (id: string) => {
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
  discountCode?: string;
  discountId?: string;
}

const updateCartById = ({
  id,
  version,
  customerId,
  email,
  productId,
  quantity,
  discountCode,
  discountId,
}: UpdateCartByIdData) => {
  const actionsData: CartUpdateAction[] = [];

  if (customerId && email) {
    actionsData.push({
      action: 'setCustomerId',
      customerId: customerId,
    });
    actionsData.push({
      action: 'setCustomerEmail',
      email: email,
    });
  }

  if (productId) {
    actionsData.push({
      action: 'addLineItem',
      productId: productId,
      quantity: quantity || 1,
    });
  }

  if (discountCode) {
    actionsData.push({
      action: 'addDiscountCode',
      code: discountCode,
    });
  }

  if (discountId) {
    actionsData.push({
      action: 'removeDiscountCode',
      discountCode: {
        typeId: 'discount-code',
        id: discountId,
      },
    });
  }

  return getApiRoot()
    .carts()
    .withId({ ID: id })
    .post({
      body: {
        actions: actionsData,
        version: version,
      },
    })
    .execute();
};

const removeProductById = ({ id, version, productId }: ChangeProduct) => {
  return getApiRoot()
    .carts()
    .withId({ ID: id })
    .post({
      body: {
        actions: [
          {
            action: 'removeLineItem',
            lineItemId: productId,
          },
        ],
        version: version,
      },
    })
    .execute();
};

const changeProductQuantity = ({
  id,
  version,
  productId,
  quantity,
}: ChangeProduct & { quantity: number }) => {
  return getApiRoot()
    .carts()
    .withId({ ID: id })
    .post({
      body: {
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId: productId,
            quantity,
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
  removeProductById,
  changeProductQuantity,
};
