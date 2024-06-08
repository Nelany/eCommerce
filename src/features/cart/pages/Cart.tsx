import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Paper,
} from '@mui/material';
import './Cart.scss';
import { getCartById } from '../api/cartApi';
import { LineItem } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';

const Cart = () => {
  const [products, setProducts] = useState<LineItem[]>([]);
  const [cartSumm, setCartSumm] = useState('');

  useEffect(() => {
    const idCart = JSON.parse(
      localStorage.getItem('cartData') as string
    ).cartId;
    const cart = async () => {
      const cartResponse = await getCartById(idCart);
      return cartResponse;
    };
    cart().then((cartResponse) => {
      setProducts(cartResponse?.body.lineItems);
      setCartSumm(
        cartResponse?.body.totalPrice.centAmount as unknown as string
      );
    });
  }, []);

  return (
    <div className="page cart-page">
      <h1>CART</h1>
      <div className="cart-products-wrapper">
        {products?.map((product) => {
          return (
            <Card className="cart-card">
              <div className="card-cart-wrapper">
                {product.variant.images && (
                  <Box sx={{ height: 250, width: 250, overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      alt="Photo of the beast Genie"
                      height="100%"
                      src={`${product.variant.images[0].url}`}
                    />
                  </Box>
                )}
                <CardContent>
                  <Typography
                    className="genie-name"
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {product.name['en-GB']}
                  </Typography>
                  <div className="product-summa-wrapper">
                    <Typography gutterBottom variant="h6" component="div">
                      {product.quantity + ' X'}
                    </Typography>
                    {product.price.discounted ? (
                      <Typography
                        className="discounted"
                        gutterBottom
                        variant="h6"
                        component="div"
                      >
                        {product.price.discounted.value.centAmount} $
                      </Typography>
                    ) : (
                      <Typography gutterBottom variant="h6" component="div">
                        {product.price.value.centAmount + ' $'}
                      </Typography>
                    )}

                    <Typography gutterBottom variant="h6" component="div">
                      {'= ' + product.totalPrice.centAmount + ' $'}
                    </Typography>
                  </div>
                </CardContent>
              </div>
            </Card>
          );
        })}
      </div>
      <Paper className="total-price" elevation={12}>
        Total price: {cartSumm + ' $'}
      </Paper>
    </div>
  );
};

export default Cart;
