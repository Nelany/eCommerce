import { useAppDispatch } from '../../../common/hooks/storeHooks';
import { setCart } from '../store/cartSlice';

const useDispatchCartId = () => {
  const dispatch = useAppDispatch();

  return (cartId: string) => {
    dispatch(setCart(cartId));
  };
};

export default useDispatchCartId;
