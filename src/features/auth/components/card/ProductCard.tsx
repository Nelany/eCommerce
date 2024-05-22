import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import './ProductCard.scss';
import { Link } from 'react-router-dom';

type Props = {
  genieName: string;
  price: string;
  description: string;
  key: string;
  imgSrc: string;
  productKey: string;
};

const ProductCard = ({
  genieName,
  price,
  description,
  imgSrc,
  productKey,
}: Props) => {
  return (
    <Card className="product-card" sx={{ maxWidth: 250 }}>
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
        <Typography gutterBottom variant="h6" component="div">
          {price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Buy</Button>

        <Link to={productKey}>
          <Button size="small">Learn More </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
