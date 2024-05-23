import { getApiRoot } from '../../../common/api/sdk';

interface QueryArgs {
  limit: number;
  sort?: string;
  offset?: number;
}

const getProducts = ({
  limit = 20,
  sort = 'createdAt desc',
  offset = 0,
}: QueryArgs) => {
  return getApiRoot()
    .products()
    .get({ queryArgs: { limit, offset, sort } })
    .execute();
};

export const catalogApi = {
  getProducts,
};
