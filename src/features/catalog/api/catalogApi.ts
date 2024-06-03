import { getApiRoot } from '../../../common/api/sdk';
import { FilterDispatch } from '../types/catalogTypes';

export interface getProductsQueryArgs {
  limit?: number;
  sort?: string;
  offset?: number;
  count?: number;
  categoryId?: string;
  where?: string;
  filter?: string[];
  priceCurrency?: string;
}

export interface getProductsArgs {
  limit?: number;
  sort?: string;
  offset?: number;
  count?: number;
  categoryId?: string;
  where?: string;
  filter?: string[];
  filters?: FilterDispatch;
  text?: string;
}

const getProducts = ({
  limit = 51,
  sort = 'createdAt desc',
  offset = 0,
  count = 51,
  text = '',
  categoryId,
  filters,
}: getProductsArgs) => {
  const args: getProductsQueryArgs = {
    limit,
    offset,
    sort,
    count,
    priceCurrency: 'USD',
  };

  args.filter = [
    `variants.price.centAmount: range(${filters?.minPrice} to ${filters?.maxPrice})`,
  ];

  if (filters?.country !== 'All') {
    args.filter.push(
      `variants.attributes.country-of-origin: "${filters?.country}"`
    );
  }

  if (filters?.discount) {
    args.filter.push(`variants.scopedPriceDiscounted: true`);
  }

  if (categoryId) {
    args.filter.push(`categories.id: subtree("${categoryId}")`);
  }

  return getApiRoot()
    .productProjections()
    .search()
    .get({
      queryArgs: { ...args, fuzzy: true, 'text.en-GB': text },
    })
    .execute();
};

const getCategories = ({ limit, offset, count }: getProductsQueryArgs) => {
  return getApiRoot()
    .categories()
    .get({ queryArgs: { limit, offset, count } })
    .execute();
};

export const catalogApi = {
  getProducts,
  getCategories,
};
