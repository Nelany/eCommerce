import { Typography } from '@mui/material';
import Counter from '../counter/Counter';
import { LineItem } from '@commercetools/platform-sdk';
import './ProductSum.scss';

function ProductSum(props: { product: LineItem }) {
  return (
    <div className="product-summa-wrapper">
      <Counter id={props.product.id} quantity={props.product.quantity} />
      {props.product.price.discounted ? (
        <div className="price-wrapper">
          <Typography className="discounted" variant="h6" component="div">
            {props.product.price.discounted.value.centAmount} $
          </Typography>
          <Typography component="div" className="full-price">
            {props.product.price.value.centAmount} $
          </Typography>
        </div>
      ) : (
        <Typography gutterBottom variant="h6" component="div">
          {props.product.price.value.centAmount + ' $'}
        </Typography>
      )}
      <Typography variant="h6" component="div">
        {props.product.totalPrice.centAmount + ' $'}
      </Typography>
    </div>
  );
}

export default ProductSum;
