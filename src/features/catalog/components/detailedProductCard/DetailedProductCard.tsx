import { Button } from '@mui/material';
import { ProductData } from '../../utils/helpers';
import CardSlider from '../slider/slider';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BasicModal from '../modal/Modal';

import './DetailedProductCard.scss';

function DetailedProductCard(props: { productData: ProductData }) {
  const discount = props.productData.discounted;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [slides, setSlides] = useState(props.productData.images);

  function changeSlidesOrder(slideIndex: number) {
    const head = slides.slice(slideIndex);
    const tail = slides.slice(0, slideIndex);
    setSlides(head.concat(tail));
  }

  function onClick() {
    navigate('/catalog');
  }

  return (
    <>
      <BasicModal slides={slides} open={open} close={handleClose} />

      <div className="product-wrapper">
        <CardSlider
          slides={slides}
          autoPlay={true}
          showArrows={false}
          openModal={handleOpen}
          changeSlidesOrder={changeSlidesOrder}
          dots={true}
        />

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

          <div className="buttons">
            <Button className="buy-button" variant="outlined" onClick={onClick}>
              Back to Catalog
            </Button>

            <Button className="buy-button" variant="contained">
              Add to Card
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailedProductCard;
