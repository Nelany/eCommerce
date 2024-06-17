import { LineItem } from '@commercetools/platform-sdk';
import { Box, CardMedia, Typography } from '@mui/material';
import './ProductCardContent.scss';

function ProductCardContent(props: { product: LineItem }) {
  return (
    <div className="cart-card-content">
      {props.product.variant.images && (
        <Box sx={{ height: 150, width: 150, overflow: 'hidden' }}>
          <CardMedia
            component="img"
            alt="Photo of the beast Genie"
            height="100%"
            src={`${props.product.variant.images[0].url}`}
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
        {props.product.name['en-GB']}
      </Typography>
    </div>
  );
}

export default ProductCardContent;
