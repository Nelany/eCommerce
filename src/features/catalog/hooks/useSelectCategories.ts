import { useAppSelector } from '../../../common/hooks/storeHooks';
import { RootState } from '../../../common/store/store';

const useSelectCategories = () =>
  useAppSelector((state: RootState) => state.categories.value);

export default useSelectCategories;
