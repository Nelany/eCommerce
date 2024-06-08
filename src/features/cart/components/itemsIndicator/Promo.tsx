import { Button } from '@mui/material';
import useApi from '../../../../common/hooks/useApi';
import { saveUserCart, updateCartById } from '../../../catalog/utils/helpers';
import { useState } from 'react';

export const Promo = () => {
  const apiCall = useApi();

  const storedCartData = localStorage.getItem('cartData');

  const discountCode = 'promoForBestStudents';
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
        discountCode,
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
    <div>
      <Button
        disabled={isDiscounted}
        className="header-button"
        variant="contained"
        onClick={clickPromo}
      >
        {isDiscounted ? 'ADDED!' : 'ADD PROMO'}
      </Button>
    </div>
  );
};
