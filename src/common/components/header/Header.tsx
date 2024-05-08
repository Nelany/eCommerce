import { useNavigate } from 'react-router-dom';
import './Header.scss';
import NavItem from '../navItem/NavItem';
import Button from '@mui/material/Button';

const nav = [
  { text: 'Home', imgSrc: '/home2.png' },
  { text: 'Catalog', imgSrc: '/book2.png' },
  { text: 'Cart', imgSrc: '/cart.png' },
  { text: 'Profile', imgSrc: '/hindu2.png' },
];

const to = { SIGN_IN: '/sign-in', SIGN_UP: '/sign-up' };

const Header = () => {
  const navigate = useNavigate();
  const onClick = (to: string) => {
    navigate(to);
  };
  return (
    <header className="nav">
      {nav.map((navItem, index) => (
        <NavItem text={navItem.text} imgSrc={navItem.imgSrc} key={index} />
      ))}
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
