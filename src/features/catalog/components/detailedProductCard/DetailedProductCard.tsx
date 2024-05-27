import { Button } from '@mui/material';
import { ProductData } from '../../utils/helpers';
import CardSlider from '../slider/Slider';
import './DetailedProduct Card.scss';

function DetailedProductCard(props: { productData: ProductData }) {
  const discount = props.productData.discounted;

  return (
    <div className="product-wrapper">
      <CardSlider slides={props.productData.images} />
      <div className="product-description">
        <h2>{props.productData.name}</h2>

        <div>
          <p className="card-clue">Description:</p>
          <p>{props.productData.description}</p>
        </div>

        <div className="prices">
          <p className="card-clue">Price:</p>
          <p
            className={discount ? 'price discount' : 'price'}
          >{`$ ${props.productData.price}`}</p>
          <p className="discounted">
            {discount ? `$ ${discount.value.centAmount}` : ''}
          </p>
        </div>

        <Button className="buy-button" variant="contained">
          {' '}
          Add to Card{' '}
        </Button>
      </div>
    </div>
  );
}

export default DetailedProductCard;
