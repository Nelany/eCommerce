import { getApiRoot } from '../../../common/api/sdk';

export interface getProductsQueryArgs {
  limit?: number;
  sort?: string;
  offset?: number;
  count?: number;
  categoryId?: string;
  where?: string;
}

const getProducts = ({
  limit = 30,
  sort = 'createdAt desc',
  offset = 0,
  count = 30,
  categoryId,
}: getProductsQueryArgs) => {
  const args: getProductsQueryArgs = { limit, offset, sort, count };

  if (categoryId) {
    args.where = `masterData(current(categories(id="${categoryId}")))`;
  }
  return getApiRoot()
    .products()
    .get({ queryArgs: { ...args } })
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
