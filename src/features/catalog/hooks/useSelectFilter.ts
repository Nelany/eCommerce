import { useAppSelector } from '../../../common/hooks/storeHooks';
import { RootState } from '../../../common/store/store';

export const useSelectFilter = () =>
  useAppSelector((state: RootState) => state.filter.value);
