import { getApiRoot } from '../../../common/api/sdk';
import { store } from '../../../common/store/store';

interface QueryArgs {
  limit: number;
  sort?: string;
  offset?: number;
};

const getProducts = ({
  limit = 20,
  sort = 'createdAt desc',
  offset = 0,
}: QueryArgs) => {
  const userId = store.getState().user;

  return getApiRoot(Boolean(userId))
    .products()
    .get({ queryArgs: { limit, offset, sort } })
    .execute();
};

export const catalogApi = {
  getProducts,
};
