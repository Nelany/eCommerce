import {
  ClientResponse,
  DiscountedPrice,
  Product,
} from '@commercetools/platform-sdk';

export type ProductData = {
  name: string;
  description: string | undefined;
  images: string[];
  country: string;
  price: number | undefined;
  currencyCode: string;
  discounted: DiscountedPrice | undefined;
};

export function formatProductData(
  serverResponse: ClientResponse<Product>
): ProductData | null {
  const product = serverResponse.body.masterData.current;
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
    name,
    description,
    images,
    country,
    price,
    currencyCode,
    discounted,
  };
}
