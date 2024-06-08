import {
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

const updateCartById = async ({
  id,
  version,
  productId,
  quantity = 1,
  apiCall,
}: UpdateCartByIdData & {
  apiCall: ApiCall;
}) => {
  const cartResponse = await apiCall(
    cartApi.updateCartById({
      id,
      version,
      productId,
      quantity,
    })
  );

  return cartResponse;
};

export function saveUserCart(id: string, version: number) {
  const newCartData = {
    cartId: id,
    cartVersion: version,
    customer: true,
  };
  localStorage.setItem('cartData', JSON.stringify(newCartData));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function addProductToCart(
  productId: string,
  apiCall: ApiCall,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cart: { dispatchSetCart: any; dispatchEmptyCart?: () => void }
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

    if (cartId && cartVersion) {
      saveUserCart(cartId, cartVersion);
      cart.dispatchSetCart(cartResponseData.body);
    }
  });
}

export function checkProduct(id: string, cart: CartValue) {
  const isInCart =
    cart && cart.lineItems.find((product) => product.productId === id);
  return Boolean(isInCart);
}
