import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import './Cart.scss';
import { useNavigate } from 'react-router-dom';
import RemoveButton from '../components/removeButton/RemoveButton';
import useSelectCart from '../hooks/useSelectCart';

const Cart = () => {
  const currentCart = useSelectCart();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/catalog');
  };

  return (
    <div className="page cart-page">
      <h1>CART</h1>
      {currentCart && currentCart.lineItems.length > 0 ? (
        <div className="cart-products-wrapper">
          {currentCart.lineItems.map((product, index) => {
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
                        <div className="price-wrapper">
                          <Typography
                            className="discounted"
                            variant="h6"
                            component="div"
                          >
                            {product.price.discounted.value.centAmount} $
                          </Typography>
                          <Typography component="div" className="full-price">
                            {product.price.value.centAmount} $
                          </Typography>
                        </div>
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
                <RemoveButton id={product.id} />
              </Card>
            );
          })}
          <Paper className="total-price" elevation={6}>
            Total price: {currentCart.totalPrice.centAmount + ' $'}
          </Paper>
        </div>
      ) : (
        <Paper elevation={6} className="message-cart-wrapper">
          <div className="message-cart">
            Oops, your shopping cart is empty. Go shopping!
          </div>
          <Button
            variant="contained"
            className="catalog-button"
            onClick={handleClick}
          >
            Go to catalog
          </Button>
        </Paper>
      )}
    </div>
  );
};

export default Cart;
