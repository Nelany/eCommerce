import { Card, Paper, CardContent } from '@mui/material';
import './Cart.scss';
import RemoveButton from '../components/removeButton/RemoveButton';
import useSelectCart from '../hooks/useSelectCart';
import ProductCardContent from '../components/productCardContent/ProductCardContent';
import ProductSum from '../components/productSum/ProductSum';
import EmptyMessage from '../components/emptyMessage/EmptyMessage';

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
                    <ProductSum product={product} />
                  </CardContent>
                  <RemoveButton id={product.id} />
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
