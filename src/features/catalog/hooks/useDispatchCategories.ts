import { useAppDispatch } from '../../../common/hooks/storeHooks';
import { setCategories } from '../store/categorySlice';

import { Category } from '../types/catalogTypes';

const useDispatchCategories = () => {
  const dispatch = useAppDispatch();

  return {
    dispatchSetCategories: (categories: Category[]) => {
      dispatch(setCategories(categories));
    },
  };
};

export default useDispatchCategories;
