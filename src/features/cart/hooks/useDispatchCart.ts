import { Cart } from '@commercetools/platform-sdk';
import { useAppDispatch } from '../../../common/hooks/storeHooks';
import { emptyCart, setCart } from '../store/cartSlice';

const useDispatchCartId = () => {
  const dispatch = useAppDispatch();

  return {
    dispatchSetCart: (cart: Cart) => {
      dispatch(setCart(cart));
    },
    dispatchEmptyCart: () => {
      dispatch(emptyCart());
    },
  };
};

export default useDispatchCartId;
