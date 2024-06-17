import { useAppSelector } from '../../../common/hooks/storeHooks';
import { RootState } from '../../../common/store/store';

const useSelectCart = () =>
  useAppSelector((state: RootState) => state.cart.value);

export default useSelectCart;
