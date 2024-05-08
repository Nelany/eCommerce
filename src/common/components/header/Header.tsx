import { useNavigate } from 'react-router-dom';
import './Header.scss';
import NavItem from '../navItem/NavItem';
import Button from '@mui/material/Button';

const nav = [
  { text: 'Home', imgSrc: '/src/assets/home2.png' },
  { text: 'Catalog', imgSrc: '/src/assets/book2.png' },
  { text: 'Cart', imgSrc: '/src/assets/cart.png' },
  { text: 'Profile', imgSrc: '/src/assets/hindu2.png' },
];

const to = { SIGN_IN: '/sign-in', SIGN_UP: '/sign-up' };

const Header = () => {
  const navigate = useNavigate();
  const onClick = (to: string) => {
    navigate(to, {replace: true});
  };
  return (
    <header className="nav">
      {nav.map((navItem) => (
        <NavItem text={navItem.text} imgSrc={navItem.imgSrc} />
      ))}
      <div className="sign-container">
        <Button
          style={{ backgroundColor: '#091D9E' }}
          variant="contained"
          onClick={() => onClick(to.SIGN_IN)}
        >
          Sign In
        </Button>

        <Button
          style={{ backgroundColor: '#091D9E' }}
          variant="contained"
          onClick={() => onClick(to.SIGN_UP)}
        >
          Sign Up
        </Button>

      </div>
    </header>
  );
};

export default Header;
