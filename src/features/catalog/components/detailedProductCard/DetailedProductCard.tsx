import { Button } from '@mui/material';
import {
  ProductData,
  addProductToCart,
  checkProduct,
  deleteProduct,
} from '../../utils/helpers';
import CardSlider from '../slider/slider';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BasicModal from '../modal/Modal';

import './DetailedProductCard.scss';
import useSelectCart from '../../../cart/hooks/useSelectCart';
import useDispatchCartId from '../../../cart/hooks/useDispatchCart';
import useApi from '../../../../common/hooks/useApi';

function DetailedProductCard(props: { productData: ProductData; id: string }) {
  const discount = props.productData.discounted;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [item, setItem] = useState(0);

  const currentCart = useSelectCart();
  const cart = useDispatchCartId();
  const apiCall = useApi();

  const [isInCart, setIsAdded] = useState(
    checkProduct(props.productData.id, currentCart)
  );

  function onClick() {
    navigate(-1);
  }

  function toggleProduct() {
    if (!isInCart) {
      addProductToCart(props.productData.id, apiCall, cart, () =>
        setIsAdded(true)
      );
    } else {
      const product = currentCart?.lineItems.find(
        (prod) => prod.productId === props.productData.id
      );

      if (!product) {
        return;
      }

      deleteProduct(product.id, apiCall, cart, () => setIsAdded(false));
    }
  }

  return (
    <>
      <BasicModal
        slides={props.productData.images}
        open={open}
        close={handleClose}
        selectedItem={item}
      />

      <div className="product-wrapper">
        <CardSlider
          slides={props.productData.images}
          autoPlay={true}
          showArrows={false}
          openModal={handleOpen}
          dots={true}
          selectedItem={item}
          pickItem={(slideIndex) => setItem(slideIndex)}
        />

        <div className="product-description">
          <h2>{props.productData.name}</h2>

          <div>
            <p className="card-clue">Description:</p>
            <p>{props.productData.description}</p>
          </div>

          <div>
            <p className="card-clue">Country:</p>
            <p>{props.productData.country}</p>
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
        </div>

        <div className="buttons">
          <Button className="buy-button" variant="outlined" onClick={onClick}>
            Back to Catalog
          </Button>

          <Button
            className="buy-button"
            variant="contained"
            color={!isInCart ? 'primary' : 'secondary'}
            onClick={toggleProduct}
          >
            {!isInCart ? 'Add to Cart' : 'Remove from Cart'}
          </Button>
        </div>
      </div>
    </>
  );
}

export default DetailedProductCard;
