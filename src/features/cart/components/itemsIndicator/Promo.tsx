import { Button } from '@mui/material';
import useApi from '../../../../common/hooks/useApi';
import { saveUserCart, updateCartById } from '../../../catalog/utils/helpers';
import { useState } from 'react';
import './Promo.scss';

export const Promo = () => {
  const apiCall = useApi();
  const storedCartData = localStorage.getItem('cartData');
  const [inputValue, setInputValue] = useState('');
  const [isDiscounted, setIsDiscounted] = useState(false);
  // При получении корзины с сервера нужно добавить проверку, применен ли уже дисконт для корзины:
  // const discountResponse =
  //           cartResponseData?.body.discountCodes;
  //         if (discountResponse && discountResponse.length > 0) {
  //           setIsDiscounted(true);
  //         }

  function clickPromo() {
    if (storedCartData && !isDiscounted) {
      const cartData = JSON.parse(storedCartData);

      const cartResponse = updateCartById({
        id: cartData.cartId,
        version: cartData.cartVersion,
        apiCall,
        discountCode: inputValue,
      });

      cartResponse.then((cartResponseData) => {
        const cartId = cartResponseData?.body.id;
        const cartVersion = cartResponseData?.body.version;
        const discountResponse = cartResponseData?.body.discountCodes;
        if (discountResponse && discountResponse.length > 0) {
          setIsDiscounted(true);
        }

        if (cartId && cartVersion) {
          saveUserCart(cartId, cartVersion);
          console.log(cartVersion);
        }
      });
    }
  }

  return (
    <>
      <h2 className="promo-h2">promoForBestStudents</h2>
      <div className="promo">
        <input
          className="promo__input"
          id="inputPROMO"
          placeholder="Enter PROMO"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <Button
          disabled={isDiscounted}
          className="promo__button"
          variant="contained"
          onClick={clickPromo}
        >
          {isDiscounted ? 'ADDED!' : 'ADD PROMO'}
        </Button>
      </div>
    </>
  );
};
