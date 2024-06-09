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
import useApi from '../../../common/hooks/useApi';

const Cart = () => {
  const [products, setProducts] = useState<LineItem[]>([]);
  const [cartSumm, setCartSumm] = useState('');
  const apiCall = useApi();

  useEffect(() => {
    const idCart = JSON.parse(
      localStorage.getItem('cartData') as string
    ).cartId;
    const cart = async () => {
      const cartResponse = await apiCall(getCartById(idCart));
      return cartResponse;
    };
    cart().then((cartResponse) => {
      if (cartResponse) setProducts(cartResponse?.body.lineItems);
      setCartSumm(
        cartResponse?.body.totalPrice.centAmount as unknown as string
      );
    });
  }, []);

  return (
    <div className="page cart-page">
      <h1>CART</h1>
      <div className="cart-products-wrapper">
        {products?.map((product, index) => {
          return (
            <Card className="cart-card" key={String(index)}>
              <div className="card-cart-wrapper">
                <div className="cart-card-content">
                  {product.variant.images && (
                    <Box sx={{ height: 150, width: 150, overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        alt="Photo of the beast Genie"
                        height="100%"
                        src={`${product.variant.images[0].url}`}
                      />
                    </Box>
                  )}
                  <Typography
                    className="genie-name"
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ width: 250 }}
                  >
                    {product.name['en-GB']}
                  </Typography>
                </div>
                <CardContent className="cart-card-content">
                  <div className="product-summa-wrapper">
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      key={String(index)}
                    >
                      {product.quantity}
                    </Typography>
                    {product.price.discounted ? (
                      <Typography
                        className="discounted"
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
                    <Typography variant="h6" component="div">
                      {product.totalPrice.centAmount + ' $'}
                    </Typography>
                  </div>
                </CardContent>
              </div>
            </Card>
          );
        })}
      </div>
      <Paper className="total-price" elevation={6}>
        Total price: {cartSumm + ' $'}
      </Paper>
    </div>
  );
};

export default Cart;
