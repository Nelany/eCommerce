import { useAppDispatch } from '../../../common/hooks/storeHooks';
import { setSort } from '../store/sortSlice';

export const useDispatchSort = () => {
  const dispatch = useAppDispatch();

  return {
    dispatchSort: (sort: string) => {
      dispatch(setSort(sort));
    },
  };
};
