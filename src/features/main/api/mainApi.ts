import { getApiRoot } from '../../../common/api/sdk';

const getProductByKey = (key: string) => {
  return getApiRoot().products().withKey({ key }).get().execute();
};

export const mainApi = {
  getProductByKey,
};
