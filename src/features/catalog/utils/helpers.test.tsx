import { ClientResponse, Product } from '@commercetools/platform-sdk';
import {
  ProductData,
  findCategoryIdByName,
  formatProductData,
} from './helpers';

describe('formatProductData', () => {
  it('should format the product data correctly', () => {
    const serverResponse: ClientResponse<Product> = {
      body: {
        id: '3a9dfb41-231c-4621-953a-7638947cfa51',
        version: 14,
        createdAt: '2024-05-26T19:27:06.073Z',
        lastModifiedAt: '2024-06-02T05:18:10.443Z',
        productType: {
          typeId: 'product-type',
          id: '26ad3336-d4e1-434f-b925-6a4f6e5ab8c1',
        },
        masterData: {
          current: {
            name: {
              'en-GB': 'Giggling Genius Genie',
            },
            description: {
              'en-GB':
                "Provides ingenious solutions to life's problems, all while spreading joy and laughter.",
            },
            categories: [
              {
                typeId: 'category',
                id: 'b53bce49-a11f-4a17-af2a-6bd68ac25712',
              },
              {
                typeId: 'category',
                id: 'd17d78d7-80f2-4060-8d55-5ba21b7b1a51',
              },
            ],
            categoryOrderHints: {},
            slug: {
              'en-GB': 'giggling-genius-genie',
            },
            metaTitle: {
              'en-GB': '',
            },
            metaDescription: {
              'en-GB': '',
            },
            masterVariant: {
              id: 1,
              sku: 'GigglingGeniusGenie',
              key: 'GigglingGeniusGenie',
              prices: [
                {
                  id: '96bc98a6-c8f1-413e-87fa-e861cb91e463',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'USD',
                    centAmount: 5700,
                    fractionDigits: 2,
                  },
                  discounted: {
                    value: {
                      type: 'centPrecision',
                      currencyCode: 'USD',
                      centAmount: 5130,
                      fractionDigits: 2,
                    },
                    discount: {
                      typeId: 'product-discount',
                      id: 'b8002d05-329f-442f-a85f-c8409daa0d1f',
                    },
                  },
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.us-central1.gcp.commercetools.com/7221fe9f-2096-4b50-844b-1dece4556290/1-DUTBt1u2.jpg',
                  dimensions: {
                    w: 1024,
                    h: 1024,
                  },
                },
                {
                  url: 'https://images.cdn.us-central1.gcp.commercetools.com/7221fe9f-2096-4b50-844b-1dece4556290/2-BLkMo2qR.jpg',
                  dimensions: {
                    w: 1024,
                    h: 1024,
                  },
                },
                {
                  url: 'https://images.cdn.us-central1.gcp.commercetools.com/7221fe9f-2096-4b50-844b-1dece4556290/3-PmEDFcrW.jpg',
                  dimensions: {
                    w: 1024,
                    h: 1024,
                  },
                },
              ],
              attributes: [
                {
                  name: 'country-of-origin',
                  value: 'United Arab Emirates',
                },
              ],
              assets: [],
            },
            variants: [],
            searchKeywords: {},
          },
          staged: {
            name: {
              'en-GB': 'Giggling Genius Genie',
            },
            description: {
              'en-GB':
                "Provides ingenious solutions to life's problems, all while spreading joy and laughter.",
            },
            categories: [
              {
                typeId: 'category',
                id: 'b53bce49-a11f-4a17-af2a-6bd68ac25712',
              },
              {
                typeId: 'category',
                id: 'd17d78d7-80f2-4060-8d55-5ba21b7b1a51',
              },
            ],
            categoryOrderHints: {},
            slug: {
              'en-GB': 'giggling-genius-genie',
            },
            metaTitle: {
              'en-GB': '',
            },
            metaDescription: {
              'en-GB': '',
            },
            masterVariant: {
              id: 1,
              sku: 'GigglingGeniusGenie',
              key: 'GigglingGeniusGenie',
              prices: [
                {
                  id: '96bc98a6-c8f1-413e-87fa-e861cb91e463',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'USD',
                    centAmount: 5700,
                    fractionDigits: 2,
                  },
                  discounted: {
                    value: {
                      type: 'centPrecision',
                      currencyCode: 'USD',
                      centAmount: 5130,
                      fractionDigits: 2,
                    },
                    discount: {
                      typeId: 'product-discount',
                      id: 'b8002d05-329f-442f-a85f-c8409daa0d1f',
                    },
                  },
                },
              ],
              images: [
                {
                  url: 'https://images.cdn.us-central1.gcp.commercetools.com/7221fe9f-2096-4b50-844b-1dece4556290/1-DUTBt1u2.jpg',
                  dimensions: {
                    w: 1024,
                    h: 1024,
                  },
                },
                {
                  url: 'https://images.cdn.us-central1.gcp.commercetools.com/7221fe9f-2096-4b50-844b-1dece4556290/2-BLkMo2qR.jpg',
                  dimensions: {
                    w: 1024,
                    h: 1024,
                  },
                },
                {
                  url: 'https://images.cdn.us-central1.gcp.commercetools.com/7221fe9f-2096-4b50-844b-1dece4556290/3-PmEDFcrW.jpg',
                  dimensions: {
                    w: 1024,
                    h: 1024,
                  },
                },
              ],
              attributes: [
                {
                  name: 'country-of-origin',
                  value: 'United Arab Emirates',
                },
              ],
              assets: [],
            },
            variants: [],
            searchKeywords: {},
          },
          published: true,
          hasStagedChanges: false,
        },
        key: 'GigglingGeniusGenie',
        taxCategory: {
          typeId: 'tax-category',
          id: '01883750-c105-48b8-a477-c362192a5542',
        },
        priceMode: 'Embedded',
      },
      statusCode: 200,
      headers: {},
    };

    const expectedData: ProductData = {
      id: '3a9dfb41-231c-4621-953a-7638947cfa51',
      name: 'Giggling Genius Genie',
      description:
        "Provides ingenious solutions to life's problems, all while spreading joy and laughter.", // Изменено на фактическое значение
      images: [
        'https://images.cdn.us-central1.gcp.commercetools.com/7221fe9f-2096-4b50-844b-1dece4556290/1-DUTBt1u2.jpg',
        'https://images.cdn.us-central1.gcp.commercetools.com/7221fe9f-2096-4b50-844b-1dece4556290/2-BLkMo2qR.jpg',
        'https://images.cdn.us-central1.gcp.commercetools.com/7221fe9f-2096-4b50-844b-1dece4556290/3-PmEDFcrW.jpg',
      ],
      country: 'United Arab Emirates',
      price: 5700,
      currencyCode: 'USD',
      discounted: {
        value: {
          centAmount: 5130,
          currencyCode: 'USD',
          type: 'centPrecision',
          fractionDigits: 2,
        },
        discount: {
          typeId: 'product-discount',
          id: 'b8002d05-329f-442f-a85f-c8409daa0d1f',
        },
      },
    };

    const result = formatProductData(serverResponse as ClientResponse<Product>);

    expect(result).toEqual(expectedData);
  });

  it('should return null if product data is incomplete', () => {
    const incompleteServerResponse: ClientResponse<Partial<Product>> = {
      body: {
        id: '1',
        version: 1,
        createdAt: '',
        lastModifiedAt: '',
        productType: { id: '1', typeId: 'product-type' },
        masterData: {
          current: {
            name: { 'en-GB': 'Test Product' },
            description: { 'en-GB': 'Test Description' },
            masterVariant: {
              id: 1,
              sku: 'test-sku',
              key: 'test-key',
              prices: [],
              attributes: [],
            },
            variants: [],
            categories: [],
            slug: {},
            searchKeywords: {},
          },
          staged: {
            name: { 'en-GB': 'Test Product' },
            description: { 'en-GB': 'Test Description' },
            masterVariant: {
              id: 1,
              sku: 'test-sku',
              key: 'test-key',
              images: [],
              prices: [],
              attributes: [],
            },
            variants: [],
            categories: [],
            slug: {},
            searchKeywords: {},
          },
          published: false,
          hasStagedChanges: false,
        },
        key: 'test-key',
        taxCategory: { id: '1', typeId: 'tax-category' },
        state: { id: '1', typeId: 'state' },
        reviewRatingStatistics: undefined,
        priceMode: 'Platform',
      },
      statusCode: 200,
      headers: {},
    };

    const result = formatProductData(
      incompleteServerResponse as ClientResponse<Product>
    );

    expect(result).toBeNull();
  });
});

describe('findCategoryIdByName', () => {
  const categories = [
    {
      id: '1',
      name: 'Parent Category',
      children: [
        {
          id: '2',
          name: 'Child Category 1',
          children: [],
        },
        {
          id: '3',
          name: 'Child Category 2',
          children: [],
        },
      ],
    },
    {
      id: '4',
      name: 'Another Parent Category',
      children: [
        {
          id: '5',
          name: 'Child Category 3',
          children: [],
        },
      ],
    },
  ];

  it('should return the correct category id for a top-level category', () => {
    const categoryId = findCategoryIdByName(categories, 'Parent Category');
    expect(categoryId).toEqual('1');
  });

  it('should return the correct category id for a nested category', () => {
    const categoryId = findCategoryIdByName(categories, 'Child Category 2');
    expect(categoryId).toEqual('3');
  });

  it('should return null if the category name is not found', () => {
    const categoryId = findCategoryIdByName(
      categories,
      'Non-existent Category'
    );
    expect(categoryId).toBeNull();
  });
});
