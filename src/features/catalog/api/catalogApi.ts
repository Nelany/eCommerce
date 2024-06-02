import { getApiRoot } from '../../../common/api/sdk';

export interface getProductsQueryArgs {
  limit?: number;
  sort?: string;
  offset?: number;
  count?: number;
  categoryId?: string;
  where?: string;
  filter?: string;
  text?: string;
}

const getProducts = ({
  limit = 51,
  sort = 'createdAt desc',
  offset = 0,
  count = 51,
  text = '',
  categoryId,
}: getProductsQueryArgs) => {
  const args: getProductsQueryArgs = { limit, offset, sort, count };

  if (categoryId) {
    args.filter = `categories.id: subtree("${categoryId}")`;
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
