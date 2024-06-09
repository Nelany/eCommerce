import { Button } from '@mui/material';
import useApi from '../../../../common/hooks/useApi';
import { saveUserCart, updateCartById } from '../../../catalog/utils/helpers';
import { useEffect, useState } from 'react';
import './Promo.scss';

export const Promo = () => {
  const apiCall = useApi();
  const [storedCartData] = useState(localStorage.getItem('cartData'));

  const [priceValue, setPriceValue] = useState('0');
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
  // При получении корзины с сервера нужно добавить проверку, применен ли уже дисконт для корзины:
  // const discountResponse =
  //           cartResponseData?.body.discountCodes;
  //         if (discountResponse?.length) {
  //           setIsDiscounted(true);
  //         }...

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

          const totalPrice = cartResponseData?.body.totalPrice?.centAmount;
          if (totalPrice) {
            setPriceValue(`${totalPrice}`);
          }
        }

        if (cartId && cartVersion) {
          saveUserCart(cartId, cartVersion);
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

          const totalPrice = cartResponseData?.body.totalPrice?.centAmount;
          if (totalPrice) {
            setPriceValue(`${totalPrice}`);
          }
        }

        if (cartId && cartVersion && discountId) {
          saveUserCart(cartId, cartVersion, discountId);
        }
      });
    }
  }

  return (
    <>
      <h2 className="promo-h2">promoForBestStudents</h2>

      <div className="promo">
        <input
          className={
            isDiscounted ? 'promo__input promo__input_disabled' : 'promo__input'
          }
          id="inputPROMO"
          placeholder="Enter PROMO"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        {isDiscounted ? (
          <Button
            disabled={!storedCartData}
            className="promo__button"
            variant="contained"
            onClick={cancelPromo}
          >
            {'CANCEL PROMO'}
          </Button>
        ) : (
          <Button
            disabled={!storedCartData || !inputValue}
            className="promo__button"
            variant="contained"
            onClick={applyPromo}
          >
            {'APPLY PROMO'}
          </Button>
        )}
      </div>
      <h3 className="promo__price">Total price: {priceValue}$</h3>
    </>
  );
};
