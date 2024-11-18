import {
  Cart,
  ClientResponse,
  DiscountedPrice,
  Product,
} from '@commercetools/platform-sdk';
import { Category } from '../types/catalogTypes';
import {
  CreateCart,
  UpdateCartByIdData,
  cartApi,
} from '../../cart/api/cartApi';
import { decryptUser } from '../../../common/utils/crypto';
import { CartValue } from '../../cart/store/cartSlice';
import { DispatchCart } from '../../cart/hooks/useDispatchCart';

export type ProductData = {
  id: string;
  name: string;
  description: string | undefined;
  images: string[];
  country: string;
  price: number | undefined;
  currencyCode: string;
  discounted: DiscountedPrice | undefined;
};

type ApiCall = <T>(method: Promise<T>) => Promise<T | undefined>;

export function formatProductData(
  serverResponse: ClientResponse<Product>
): ProductData | null {
  const product = serverResponse.body.masterData.current;
  const id = serverResponse.body.id;
  const imagesData = product.masterVariant.images;
  const attributes = product.masterVariant.attributes;
  const priceData = product.masterVariant?.prices;

  if (!product || !imagesData || !priceData || !attributes) {
    return null;
  }

  const name = product.name['en-GB'];
  const description = product.description?.['en-GB'];
  const images = imagesData.map((img) => img.url);
  const country = attributes[0].value;
  const price = priceData[0].value.centAmount;
  const currencyCode = priceData[0].value.currencyCode;
  const discounted = priceData[0].discounted;

  return {
    id,
    name,
    description,
    images,
    country,
    price,
    currencyCode,
    discounted,
  };
}

export const findCategoryIdByName = (categories: Category[], name: string) => {
  for (const category of categories) {
    if (category.name === name) {
      return category.id;
    }
    if (category.children && category.children.length > 0) {
      const childId = findCategoryIdByName(category.children, name) as string;
      if (childId) {
        return childId;
      }
    }
  }
  return null;
};

const createCart = async ({
  id,
  email,
  productId,
  apiCall,
}: CreateCart & { apiCall: ApiCall }) => {
  const cartResponse = await apiCall(
    cartApi.createCart({ id, email, productId })
  );

  return cartResponse;
};

export const updateCartById = async ({
  id,
  version,
  productId,
  quantity = 1,
  apiCall,
  discountCode,
  discountId,
}: UpdateCartByIdData & {
  apiCall: ApiCall;
}) => {
  const cartResponse = await apiCall(
    cartApi.updateCartById({
      id,
      version,
      productId,
      quantity,
      discountCode,
      discountId,
    })
  );

  return cartResponse;
};

export function saveUserCart(id: string, version: number, discountId?: string) {
  const newCartData = {
    cartId: id,
    cartVersion: version,
    customer: true,
    discountId: discountId || '',
  };
  localStorage.setItem('cartData', JSON.stringify(newCartData));
}

export function addProductToCart(
  productId: string,
  apiCall: ApiCall,
  cart: DispatchCart,
  setFlag: () => void,
  discountCode?: string
) {
  const storedUserId = localStorage.getItem('userId');
  const storedCartData = localStorage.getItem('cartData');
  let cartResponse;

  if (storedCartData) {
    const cartData = JSON.parse(storedCartData);
    cartResponse = updateCartById({
      id: cartData.cartId,
      version: cartData.cartVersion,
      productId,
      apiCall,
      discountCode,
    });
  } else {
    const userSecrets = decryptUser(
      localStorage.getItem('userSecret') || 'null'
    );
    cartResponse = createCart({
      id: storedUserId || undefined,
      email: userSecrets?.username,
      productId,
      apiCall,
    });
  }

  cartResponse.then((cartResponseData) => {
    const cartId = cartResponseData?.body.id;
    const cartVersion = cartResponseData?.body.version;
    const discountId =
      cartResponseData?.body.discountCodes[0]?.discountCode.id || '';

    if (cartId && cartVersion) {
      saveUserCart(cartId, cartVersion, discountId);
      cart.dispatchSetCart(cartResponseData.body);
      setFlag();
    }
  });
}

export function updateUserCart(
  response: ClientResponse<Cart>,
  cart: DispatchCart
) {
  const cartId = response.body.id;
  const cartVersion = response.body.version;
  const discountId = response.body.discountCodes[0]?.discountCode.id || '';

  if (cartId && cartVersion) {
    saveUserCart(cartId, cartVersion, discountId);
    cart.dispatchSetCart(response.body);
  }
}

export async function deleteProduct(
  id: string,
  apiCall: ApiCall,
  cart: DispatchCart,
  setFlag?: () => void
) {
  const storedCartData = localStorage.getItem('cartData');

  if (!storedCartData) {
    return;
  }

  const cartData = JSON.parse(storedCartData);
  const cartResponse = await apiCall(
    cartApi.removeProductById({
      id: cartData.cartId,
      version: cartData.cartVersion,
      productId: id,
    })
  );

  if (!cartResponse) {
    return;
  }

  updateUserCart(cartResponse, cart);
  setFlag?.();
}

export function checkProduct(id: string, cart: CartValue) {
  const isInCart =
    cart && cart.lineItems.find((product) => product.productId === id);
  return Boolean(isInCart);
}
