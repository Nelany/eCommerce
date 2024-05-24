import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import './ProductCard.scss';
import { Link } from 'react-router-dom';

type Props = {
  genieName: string;
  price: string;
  description: string;
  key: string;
  imgSrc: string;
  productKey: string;
  discounted: string;
};

const ProductCard = ({
  genieName,
  price,
  description,
  imgSrc,
  productKey,
  discounted,
}: Props) => {
  return (
    <Card className="product-card" sx={{ maxWidth: 250 }}>
      <div className="flex-container">
        <Link to={productKey}>
          <CardActionArea sx={{ color: '#454545' }}>
            <Box sx={{ height: 250, width: 250, overflow: 'hidden' }}>
              <CardMedia
                component="img"
                alt="the beast Genie"
                height="100%"
                image={imgSrc}
              />
            </Box>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {genieName}
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
                {price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions>
          <Button sx={{ width: 240 }} size="small">
            <img className="cart" src="/cart.png" alt="ADD TO CART" />
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};

export default ProductCard;
