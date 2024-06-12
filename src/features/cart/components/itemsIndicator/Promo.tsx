import { Button, TextField } from '@mui/material';
import useApi from '../../../../common/hooks/useApi';
import { saveUserCart, updateCartById } from '../../../catalog/utils/helpers';
import { useEffect, useState } from 'react';
import './Promo.scss';
import useDispatchCartId from '../../hooks/useDispatchCart';

export const Promo = () => {
  const cart = useDispatchCartId();

  const apiCall = useApi();
  const [storedCartData] = useState(localStorage.getItem('cartData'));

  const [inputValue, setInputValue] = useState('');
  const [isDiscounted, setIsDiscounted] = useState(false);

  useEffect(() => {
    if (storedCartData) {
      const cartData = JSON.parse(storedCartData);
      if (cartData.discountId) {
        setIsDiscounted(true);
        setInputValue('promoForBestStudents');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function cancelPromo() {
    const lastStoredCartData = localStorage.getItem('cartData');

    if (lastStoredCartData && isDiscounted) {
      const cartData = JSON.parse(lastStoredCartData);

      updateCartById({
        id: cartData.cartId,
        version: cartData.cartVersion,
        apiCall,
        discountId: cartData.discountId,
      }).then((cartResponseData) => {
        const cartId = cartResponseData?.body.id;
        const cartVersion = cartResponseData?.body.version;
        const discountResponse = cartResponseData?.body.discountCodes;
        if (discountResponse && discountResponse.length === 0) {
          setIsDiscounted(false);
          setInputValue('');
        }

        if (cartId && cartVersion) {
          saveUserCart(cartId, cartVersion);
          cart.dispatchSetCart(cartResponseData.body);
        }
      });
    }
  }

  function applyPromo() {
    const lastStoredCartData = localStorage.getItem('cartData');

    if (lastStoredCartData && !isDiscounted) {
      const cartData = JSON.parse(lastStoredCartData);

      updateCartById({
        id: cartData.cartId,
        version: cartData.cartVersion,
        apiCall,
        discountCode: inputValue,
      }).then((cartResponseData) => {
        const cartId = cartResponseData?.body.id;
        const cartVersion = cartResponseData?.body.version;
        const discountId =
          cartResponseData?.body.discountCodes[0]?.discountCode.id;
        const discountResponse = cartResponseData?.body.discountCodes;
        if (discountResponse?.length && discountId) {
          setIsDiscounted(true);
        }

        if (cartId && cartVersion && discountId) {
          saveUserCart(cartId, cartVersion, discountId);
          cart.dispatchSetCart(cartResponseData.body);
        }
      });
    }
  }

  return (
    <>
      <div className="promo">
        <TextField
          className={
            isDiscounted ? 'promo__input promo__input_disabled' : 'promo__input'
          }
          id="inputPROMO"
          label="Enter PROMO"
          variant="standard"
          value={inputValue}
          // ПРОМОКОД: promoForBestStudents !!!!!!!!!!!!
          onChange={(e) => setInputValue(e.target.value)}
        />

        {isDiscounted ? (
          <Button
            disabled={!storedCartData}
            className="promo__button"
            variant="outlined"
            onClick={cancelPromo}
          >
            {'CANCEL PROMO'}
          </Button>
        ) : (
          <Button
            disabled={!storedCartData || !inputValue}
            className="promo__button"
            variant="outlined"
            onClick={applyPromo}
          >
            {'APPLY PROMO'}
          </Button>
        )}
      </div>
    </>
  );
};
