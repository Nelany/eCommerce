import { getApiRoot } from '../../../common/api/sdk';

interface QueryArgs {
  limit?: number;
  sort?: string;
  offset?: number;
  count?: number;
}

const getProducts = ({
  limit = 30,
  sort = 'createdAt desc',
  offset = 0,
  count = 30,
}: QueryArgs) => {
  return getApiRoot()
    .products()
    .get({ queryArgs: { limit, offset, sort, count } })
    .execute();
};

const getCategories = ({
  limit,
  offset,
  count,
}: QueryArgs) => {
  return getApiRoot()
    .categories()
    .get({ queryArgs: { limit, offset, count } })
    .execute();
};

export const catalogApi = {
  getProducts,
  getCategories,
};
