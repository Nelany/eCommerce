import { useEffect } from 'react';
import { cartApi } from '../../api/cartApi';
import useDispatchCartId from '../../hooks/useDispatchCart';

function CartLoader() {
  const cartData = localStorage.getItem('cartData');
  const cartDispatch = useDispatchCartId();

  useEffect(() => {
    async function getCart(id: string) {
      return await cartApi.getCartById(id);
    }

    cartData &&
      getCart(JSON.parse(cartData).cartId).then((response) =>
        cartDispatch.dispatchSetCart(response.body)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div />;
}

export default CartLoader;
