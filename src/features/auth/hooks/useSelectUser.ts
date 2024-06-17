import { useAppSelector } from '../../../common/hooks/storeHooks';
import { RootState } from '../../../common/store/store';

const useSelectUser = () =>
  useAppSelector((state: RootState) => state.user.value);

export default useSelectUser;
