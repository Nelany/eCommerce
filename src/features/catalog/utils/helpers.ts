import {
  ClientResponse,
  DiscountedPrice,
  Product,
} from '@commercetools/platform-sdk';
import { Category } from '../types/catalogTypes';

export type ProductData = {
  name: string;
  description: string | undefined;
  images: string[];
  price: number | undefined;
  currencyCode: string;
  discounted: DiscountedPrice | undefined;
};

export function formatProductData(
  serverResponse: ClientResponse<Product>
): ProductData | null {
  const product = serverResponse.body.masterData.current;
  const imagesData = product.masterVariant.images;
  const priceData = product.masterVariant?.prices;

  if (!product || !imagesData || !priceData) {
    return null;
  }

  const name = product.name['en-GB'];
  const description = product.description?.['en-GB'];
  const images = imagesData.map((img) => img.url);
  const price = priceData[0].value.centAmount;
  const currencyCode = priceData[0].value.currencyCode;
  const discounted = priceData[0].discounted;

  return {
    name,
    description,
    images,
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
