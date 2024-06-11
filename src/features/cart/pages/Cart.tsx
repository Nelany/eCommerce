import { Card, Paper, CardContent } from '@mui/material';
import './Cart.scss';
import RemoveButton from '../components/removeButton/RemoveButton';
import useSelectCart from '../hooks/useSelectCart';
import ProductCardContent from '../components/productCardContent/ProductCardContent';
import ProductSum from '../components/productSum/ProductSum';
import EmptyMessage from '../components/emptyMessage/EmptyMessage';
import Counter from '../components/counter/Counter';

const Cart = () => {
  const currentCart = useSelectCart();

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

          <Paper className="total-price" elevation={6}>
            Total price: {currentCart.totalPrice.centAmount + ' $'}
          </Paper>
        </div>
      ) : (
        <EmptyMessage />
      )}
    </div>
  );
};

export default Cart;
