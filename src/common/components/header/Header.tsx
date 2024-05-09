import { useNavigate } from 'react-router-dom';
import './Header.scss';
import Button from '@mui/material/Button';
import NavMenu from '../navMenu/NavMenu';


const to = { SIGN_IN: '/sign-in', SIGN_UP: '/sign-up' };

const Header = () => {
  const navigate = useNavigate();
  const onClick = (to: string) => {
    navigate(to);
  };

  return (
    <header className="nav">
      <NavMenu />
      
      <div className="sign-container">
        <Button variant="contained" onClick={() => onClick(to.SIGN_IN)}>
          Sign In
        </Button>

        <Button variant="contained" onClick={() => onClick(to.SIGN_UP)}>
          Sign Up
        </Button>
      </div>
    </header>
  );
};

export default Header;
