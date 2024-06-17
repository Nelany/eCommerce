import { Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './EmptyMessage.scss';

function EmptyMessage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/catalog');
  };

  return (
    <Paper elevation={6} className="message-cart-wrapper">
      <div className="message-cart">
        Oops, your shopping cart is empty. Go shopping!
      </div>
      <Button
        variant="contained"
        className="catalog-button"
        onClick={handleClick}
      >
        Go to catalog
      </Button>
    </Paper>
  );
}

export default EmptyMessage;
