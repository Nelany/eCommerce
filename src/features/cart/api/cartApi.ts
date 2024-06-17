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

const CART_VERSION_ERROR = 'ConcurrentModification';

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

const updateCartById = async ({
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
  try {
    const response = await getApiRoot()
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          actions: actionsData,
          version: version,
        },
      })
      .execute();
    return response;
  } catch (error) {
    if ((error as { name: string })?.name === CART_VERSION_ERROR) {
      const cartResponse = await getCartById(id);
      return getApiRoot()
        .carts()
        .withId({ ID: id })
        .post({
          body: {
            actions: actionsData,
            version: cartResponse.body.version,
          },
        })
        .execute();
    }
    throw error;
  }
};

const removeProductById = async ({ id, version, productId }: ChangeProduct) => {
  try {
    const response = await getApiRoot()
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
    return response;
  } catch (error) {
    if ((error as { name: string })?.name === CART_VERSION_ERROR) {
      const cartResponse = await getCartById(id);

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
          version: cartResponse.body.version,
        },
      })
      .execute();
    }
    throw error;
  }
};

const changeProductQuantity = async ({
  id,
  version,
  productId,
  quantity,
}: ChangeProduct & { quantity: number }) => {
  try {
    const response = await getApiRoot()
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
    return response;
  } catch (error) {
    if ((error as { name: string })?.name === CART_VERSION_ERROR) {
      const cartResponse = await getCartById(id);
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
            version: cartResponse.body.version,
          },
        })
        .execute();
    }
    throw error;
  }
};

const removeCartById = async (ID: string, version: number) => {
  try {
    const response = await getApiRoot()
      .carts()
      .withId({ ID })
      .delete({
        queryArgs: {
          version: version,
        },
      })
      .execute();
    return response;
  } catch (error) {
    if ((error as { name: string })?.name === CART_VERSION_ERROR) {
      const cartResponse = await getCartById(ID);

      return getApiRoot()
        .carts()
        .withId({ ID })
        .delete({
          queryArgs: {
            version: cartResponse.body.version,
          },
        })
        .execute();
    }
    throw error;
  }

};

export const cartApi = {
  createCart,
  getCartById,
  getCartByCustomerId,
  updateCartById,
  removeProductById,
  changeProductQuantity,
  removeCartById,
};
