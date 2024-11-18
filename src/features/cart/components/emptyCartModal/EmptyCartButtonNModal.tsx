import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import './EmptyCartButtonNModal.scss';
import useSelectCart from '../../hooks/useSelectCart';
import useApi from '../../../../common/hooks/useApi';
import { cartApi } from '../../api/cartApi';
import useDispatchCartId from '../../hooks/useDispatchCart';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

export function EmptyCartButtonNModal() {
  const { dispatchEmptyCart } = useDispatchCartId();
  const currentCart = useSelectCart();
  const [apiCall, isLoading] = useApi();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  function handleEmptyCart() {
    setOpenModal(false);
    const cartId = currentCart?.id;
    const cartVersion = currentCart?.version;
    if (cartId && cartVersion) {
      apiCall(cartApi.removeCartById(cartId, cartVersion)).then(
        (emptyCartResponse) => {
          if (emptyCartResponse) {
            dispatchEmptyCart();
          }
        }
      );
    }
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleOpenModal}>
        <img className="cart__empty-cart-img" src="/trash.png" alt="" />
        {'CLEAR CART'}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Are you sure you want to clear the shopping cart?
            </Typography>
            <div className="empty-cart__buttons-container">
              <Button
                disabled={isLoading}
                onClick={handleEmptyCart}
                variant="outlined"
              >
                Yes!
              </Button>
              <Button onClick={handleCloseModal} variant="outlined">
                No!
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
