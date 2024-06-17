import { useEffect, useState } from 'react';
import { cartApi } from '../../api/cartApi';
import useDispatchCartId from '../../hooks/useDispatchCart';
import CircularProgress from '@mui/material/CircularProgress';

function CartLoader(props: { children: JSX.Element }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const cartData = localStorage.getItem('cartData');
  const cartDispatch = useDispatchCartId();

  useEffect(() => {
    async function getCart(id: string) {
      return await cartApi.getCartById(id);
    }

    if (cartData) {
      getCart(JSON.parse(cartData).cartId)
        .then((response) => {
          cartDispatch.dispatchSetCart(response.body);
          setIsLoaded(true);
        })
        .catch(() => {
          localStorage.removeItem('cartData');
          setIsLoaded(true);
        });
    } else {
      setIsLoaded(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoaded ? (
    props.children
  ) : (
    <div className="spinner-wrapper">
      <CircularProgress />
    </div>
  );
}

export default CartLoader;
