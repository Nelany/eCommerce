import { Button } from '@mui/material';
import './RemoveButton.scss';
import useDispatchCartId from '../../hooks/useDispatchCart';
import useApi from '../../../../common/hooks/useApi';
import { deleteProduct } from '../../../catalog/utils/helpers';

function RemoveButton(props: { id: string }) {
  const cart = useDispatchCartId();
  const apiCall = useApi();

  function removeProductFromCart() {
    console.log('click');
    deleteProduct(props.id, apiCall, cart);
  }
  return (
    <Button
      variant="contained"
      className="remove-button"
      onClick={removeProductFromCart}
    >
      Remove from Cart
    </Button>
  );
}

export default RemoveButton;
