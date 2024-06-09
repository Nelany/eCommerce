import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import './ProductCard.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { addProductToCart, checkProduct } from '../../utils/helpers';
import useApi from '../../../../common/hooks/useApi';
import useDispatchCartId from '../../../cart/hooks/useDispatchCart';
import useSelectCart from '../../../cart/hooks/useSelectCart';

type Props = {
  id: string;
  genieName: string;
  price: string;
  description: string;
  key: string;
  imgSrc: string;
  productKey: string;
  discounted: string;
};

const ProductCard = ({
  id,
  genieName,
  price,
  description,
  imgSrc,
  productKey,
  discounted,
}: Props) => {
  const currentCart = useSelectCart();

  const [isInCart, setIsAdded] = useState(checkProduct(id, currentCart));
  const apiCall = useApi();

  const cart = useDispatchCartId();

  function addToCart() {
    addProductToCart(id, apiCall, cart, () => setIsAdded(true));
  }

  return (
    <Card
      className={price && productKey ? 'product-card' : 'disabled-product-card'}
      sx={{ maxWidth: 250 }}
    >
      <div className="flex-container">
        <Link to={`/catalog/product/${productKey}`}>
          <CardActionArea sx={{ color: '#454545' }}>
            <Box sx={{ height: 250, width: 250, overflow: 'hidden' }}>
              <CardMedia
                component="img"
                alt="Photo of the beast Genie"
                height="100%"
                image={imgSrc || '/notFoundGenie.jpg'}
              />
            </Box>
            <CardContent>
              <Typography
                className="genie-name"
                gutterBottom
                variant="h5"
                component="div"
              >
                {genieName || 'Incognito'}
              </Typography>
              {discounted && (
                <Typography
                  className="discounted"
                  gutterBottom
                  variant="h6"
                  component="div"
                >
                  {discounted} $
                </Typography>
              )}
              <Typography
                className={discounted && 'disabled'}
                gutterBottom
                variant="h6"
                component="div"
              >
                {price && productKey ? price + ' $' : 'NOT AVAILABLE'}
              </Typography>
              <Typography
                className="description"
                variant="body2"
                color="text.secondary"
              >
                {description || 'The beast Genie!'}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions>
          <Button
            disabled={isInCart}
            onClick={addToCart}
            sx={{ width: 240 }}
            size="small"
          >
            {isInCart ? (
              'Added'
            ) : (
              <img className="cart" src="/cart.png" alt="ADD TO CART" />
            )}
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};

export default ProductCard;
