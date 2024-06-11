import './RemoveButton.scss';
import useDispatchCartId from '../../hooks/useDispatchCart';
import useApi from '../../../../common/hooks/useApi';
import { deleteProduct } from '../../../catalog/utils/helpers';

function RemoveButton(props: { id: string }) {
  const cart = useDispatchCartId();
  const apiCall = useApi();

  function removeProductFromCart() {
    deleteProduct(props.id, apiCall, cart);
  }
  return <button className="remove-button" onClick={removeProductFromCart} />;
}

export default RemoveButton;
