import './Counter.scss';
import { updateUserCart } from '../../../catalog/utils/helpers';
import useApi from '../../../../common/hooks/useApi';
import useDispatchCartId from '../../hooks/useDispatchCart';
import { cartApi } from '../../api/cartApi';
import useSelectCart from '../../hooks/useSelectCart';

function Counter(props: { id: string; quantity: number }) {
  const currentCart = useSelectCart();
  const product = currentCart?.lineItems.find((item) => item.id === props.id);
  const storedCartData = localStorage.getItem('cartData');
  const apiCall = useApi();
  const cart = useDispatchCartId();

  if (!storedCartData || !product) {
    return;
  }

  const cartData = JSON.parse(storedCartData);

  async function getNewCart(flag: 'plus' | 'minus') {
    const currentQuantity = product ? product.quantity : 0;

    const quantity =
      flag === 'plus' ? currentQuantity + 1 : currentQuantity - 1;
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
  }
  function increaseProduct() {
    getNewCart('plus');
  }

  function decreaseProduct() {
    getNewCart('minus');
  }

  return (
    <div className="counter">
      <button
        className="counter-button"
        onClick={decreaseProduct}
        disabled={product.quantity === 1}
      >
        -
      </button>
      <p className="current-count">{product.quantity}</p>
      <button className="counter-button" onClick={increaseProduct}>
        +
      </button>
    </div>
  );
}

export default Counter;
