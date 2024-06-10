import useSelectCart from '../../hooks/useSelectCart';
import { CartValue } from '../../store/cartSlice';
import './ItemsIndicator.scss';

function ItemsIndicator() {
  const cart: CartValue = useSelectCart();

  if (!cart || cart.lineItems.length === 0) {
    return null;
  }

  return <div className="items-indicator">{cart.lineItems.length}</div>;
}

export default ItemsIndicator;
