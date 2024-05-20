import { useAppDispatch } from '../../../common/hooks/storeHooks';
import { emptyCart, setCart } from '../store/cartSlice';

const useDispatchCartId = () => {
  const dispatch = useAppDispatch();

  return {
    dispatchSetCart: (cartId: string) => {
      dispatch(setCart(cartId));
    },
    dispatchEmptyCart: () => {
      dispatch(emptyCart());
    },
  };
};

export default useDispatchCartId;
