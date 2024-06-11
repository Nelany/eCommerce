import { useState } from 'react';
import './Counter.scss';
import { updateUserCart } from '../../../catalog/utils/helpers';
import useApi from '../../../../common/hooks/useApi';
import useDispatchCartId from '../../hooks/useDispatchCart';
import { cartApi } from '../../api/cartApi';

function Counter(props: { id: string; quantity: number }) {
  const [currentCount, setCurrentCount] = useState(props.quantity);
  const storedCartData = localStorage.getItem('cartData');
  const apiCall = useApi();
  const cart = useDispatchCartId();

  if (!storedCartData) {
    return;
  }

  const cartData = JSON.parse(storedCartData);

  async function getNewCart(callback: () => void, flag: 'plus' | 'minus') {
    const quantity = flag === 'plus' ? currentCount + 1 : currentCount - 1;
    const newCart = await apiCall(
      cartApi.changeProductQuantity({
        id: cartData.cartId,
        version: cartData.cartVersion,
        productId: props.id,
        quantity,
      })
    );

    if (!newCart) {
      return;
    }

    updateUserCart(newCart, cart);
    callback();
  }

  function increaseCounter() {
    setCurrentCount((prev) => (prev += 1));
  }

  function decreaseCounter() {
    setCurrentCount((prev) => (prev -= 1));
  }

  function increaseProduct() {
    getNewCart(increaseCounter, 'plus');
  }

  function decreaseProduct() {
    getNewCart(decreaseCounter, 'minus');
  }

  return (
    <div className="counter">
      <button
        className="counter-button"
        onClick={decreaseProduct}
        disabled={currentCount === 1}
      >
        -
      </button>
      <p className="current-count">{currentCount}</p>
      <button className="counter-button" onClick={increaseProduct}>
        +
      </button>
    </div>
  );
}

export default Counter;
