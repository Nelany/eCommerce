import { useAppSelector } from '../../../common/hooks/storeHooks';
import { RootState } from '../../../common/store/store';

export const useSelectSelectedCategory = () =>
  useAppSelector((state: RootState) => state.selectedCategoryId.value);


