import { useAppDispatch } from '../../../common/hooks/storeHooks';
import { setSelectedCategory } from '../store/selectedCategorySlice';

export const useDispatchSelectedCategory = () => {
  const dispatch = useAppDispatch();

  return {
    dispatchSetSelectedCategory: (categoryId: string) => {
      dispatch(setSelectedCategory(categoryId));
    },
  };
};
