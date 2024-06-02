import { useAppDispatch } from '../../../common/hooks/storeHooks';
import { setFilter } from '../store/filterSlice';
import { FilterDispatch } from '../types/catalogTypes';



export const useDispatchFilter = () => {
  const dispatch = useAppDispatch();

  return {
    dispatchFilter: (filter: FilterDispatch) => {
      dispatch(setFilter(filter));
    },
  };
};
