import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import './ProductCard.scss';
import { Link } from 'react-router-dom';

export default function ProductCard() {
  return (
    <Card className="product-card" sx={{ maxWidth: 250 }}>
      <Box sx={{ height: 250, width: 250, overflow: 'hidden' }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="100%"
          image="/2-7.jpg"
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          RS Genie
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          1 000 000 $
        </Typography>
        <Typography variant="body2" color="text.secondary">
          RS Genie will happily complete all your RS-School tasks in an instant
          and with the highest quality!
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Buy</Button>

        <Link to={'RS Genie'}>
          <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
