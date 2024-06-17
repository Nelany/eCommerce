import { Cart } from '@commercetools/platform-sdk';

export const testCart: Cart = {
  id: 'b5f6b37c-950b-4bc6-b12b-866be43cbf52',
  version: 1,
  createdAt: '2024-06-08T18:31:36.961Z',
  lastModifiedAt: '2024-06-08T18:31:36.961Z',
  lastModifiedBy: {
    clientId: '801EUWmRm9kdLbC3MgSQJuYg',

    anonymousId: 'ccd655b6-5d08-4d97-912d-f92d626b4f73',
  },
  createdBy: {
    clientId: '801EUWmRm9kdLbC3MgSQJuYg',

    anonymousId: 'ccd655b6-5d08-4d97-912d-f92d626b4f73',
  },
  lineItems: [
    {
      id: '69fe69bd-98b2-46d6-8d73-86b71daabb5e',
      productId: '75bb9087-6d13-44a3-ad3a-9a6ee389814c',
      productKey: 'ChuckleChampionGenie',
      name: {
        'en-GB': 'Chuckle Champion Genie',
      },
      productType: {
        typeId: 'product-type',
        id: '26ad3336-d4e1-434f-b925-6a4f6e5ab8c1',
      },
      productSlug: {
        'en-GB': 'chuckle-champion-genie',
      },
      variant: {
        id: 1,
        sku: 'ChuckleChampionGenie',
        key: 'ChuckleChampionGenie',
        prices: [
          {
            id: '4db3e5c2-fd85-4713-9f40-2acb8cc9d4c7',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 1200,
              fractionDigits: 2,
            },
          },
        ],
        images: [
          {
            url: 'https://images.cdn.us-central1.gcp.commercetools.com/7221fe9f-2096-4b50-844b-1dece4556290/2-mJgKYZX6.jpg',
            dimensions: {
              w: 1024,
              h: 1024,
            },
          },
          {
            url: 'https://images.cdn.us-central1.gcp.commercetools.com/7221fe9f-2096-4b50-844b-1dece4556290/3-DIMeWPJh.jpg',
            dimensions: {
              w: 1024,
              h: 1024,
            },
          },
          {
            url: 'https://images.cdn.us-central1.gcp.commercetools.com/7221fe9f-2096-4b50-844b-1dece4556290/1-jpmXx0l2.jpg',
            dimensions: {
              w: 1024,
              h: 1024,
            },
          },
        ],
        attributes: [
          {
            name: 'country-of-origin',
            value: 'Italy',
          },
        ],
        assets: [],
      },
      price: {
        id: '4db3e5c2-fd85-4713-9f40-2acb8cc9d4c7',
        value: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 1200,
          fractionDigits: 2,
        },
      },
      quantity: 1,
      discountedPricePerQuantity: [],
      perMethodTaxRate: [],
      addedAt: '2024-06-08T18:31:36.950Z',
      lastModifiedAt: '2024-06-08T18:31:36.950Z',
      state: [
        {
          quantity: 1,
          state: {
            typeId: 'state',
            id: '92fe7082-5151-49a7-ac54-e8101035c741',
          },
        },
      ],
      priceMode: 'Platform',
      lineItemMode: 'Standard',
      totalPrice: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 1200,
        fractionDigits: 2,
      },
      taxedPricePortions: [],
    },
  ],
  cartState: 'Active',
  totalPrice: {
    type: 'centPrecision',
    currencyCode: 'USD',
    centAmount: 1200,
    fractionDigits: 2,
  },
  shippingMode: 'Single',
  shipping: [],
  customLineItems: [],
  discountCodes: [],
  directDiscounts: [],
  inventoryMode: 'None',
  taxMode: 'Platform',
  taxRoundingMode: 'HalfEven',
  taxCalculationMode: 'LineItemLevel',
  deleteDaysAfterLastModification: 90,
  refusedGifts: [],
  origin: 'Customer',
  itemShippingAddresses: [],
  totalLineItemQuantity: 1,
};
