import { Cart } from '@commercetools/platform-sdk';
import { useAppDispatch } from '../../../common/hooks/storeHooks';
import { emptyCart, setCart } from '../store/cartSlice';

export type DispatchCart = {
  dispatchSetCart: (cart: Cart) => void;
  dispatchEmptyCart: () => void;
};
const useDispatchCartId = (): DispatchCart => {
  const dispatch = useAppDispatch();

  return {
    dispatchSetCart: (cart) => {
      dispatch(setCart(cart));
    },
    dispatchEmptyCart: () => {
      dispatch(emptyCart());
      localStorage.removeItem('cartData');
    },
  };
};

export default useDispatchCartId;
