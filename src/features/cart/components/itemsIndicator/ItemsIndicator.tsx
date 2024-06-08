import { Cart } from '@commercetools/platform-sdk';
import useSelectCart from '../../hooks/useSelectCart';
// eslint-disable-next-line import/namespace
import { CartValue } from '../../store/cartSlice';
import './ItemsIndicator.scss';

function ItemsIndicator() {
  const cart: CartValue = useSelectCart();

  if (!cart || (cart as Cart).lineItems.length === 0) {
    return null;
  }

  return (
    <div className="items-indicator">{(cart as Cart).lineItems.length}</div>
  );
}

export default ItemsIndicator;
