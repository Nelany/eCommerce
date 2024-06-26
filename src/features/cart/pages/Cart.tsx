import { Card, Paper, CardContent } from '@mui/material';
import './Cart.scss';
import RemoveButton from '../components/removeButton/RemoveButton';
import useSelectCart from '../hooks/useSelectCart';
import ProductCardContent from '../components/productCardContent/ProductCardContent';
import ProductSum from '../components/productSum/ProductSum';
import EmptyMessage from '../components/emptyMessage/EmptyMessage';
import Counter from '../components/counter/Counter';
import { Promo } from '../components/itemsIndicator/Promo';
import { EmptyCartButtonNModal } from '../components/emptyCartModal/EmptyCartButtonNModal';
import { useMemo } from 'react';

const Cart = () => {
  const currentCart = useSelectCart();

  const moneySaved = useMemo(
    () => currentCart?.discountOnTotalPrice?.discountedAmount.centAmount,
    [currentCart]
  );

  return (
    <div className="page cart-page">
      <h1>CART</h1>
      {currentCart && currentCart.lineItems.length > 0 ? (
        <div className="cart-products-wrapper">
          {currentCart.lineItems.map((product, index) => {
            return (
              <Card className="cart-card" key={String(index)}>
                <div className="card-cart-wrapper">
                  <ProductCardContent product={product} />

                  <CardContent className="cart-card-content">
                    <Counter id={product.id} quantity={product.quantity} />
                    <ProductSum product={product} />
                    <RemoveButton id={product.id} />
                  </CardContent>
                </div>
              </Card>
            );
          })}

          <Paper className="cart__promo-container">
            <Promo />
          </Paper>

          <Paper className="total-price" elevation={6}>
            <EmptyCartButtonNModal />
            <div className="cart__total-price-wrapper">
              <div>Total price: </div>
              <div className="cart__total-price-container">
                <div className={moneySaved ? 'discounted' : 'not-discounted'}>
                  {currentCart.totalPrice.centAmount + ' $'}
                </div>
                {moneySaved && (
                  <div className="full-price">
                    {+moneySaved + currentCart.totalPrice.centAmount + '$'}
                  </div>
                )}
              </div>
            </div>
          </Paper>
        </div>
      ) : (
        <EmptyMessage />
      )}
    </div>
  );
};

export default Cart;
