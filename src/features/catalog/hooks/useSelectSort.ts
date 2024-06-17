import { useAppSelector } from '../../../common/hooks/storeHooks';
import { RootState } from '../../../common/store/store';

export const useSelectSort = () =>
  useAppSelector((state: RootState) => state.sort.value);


