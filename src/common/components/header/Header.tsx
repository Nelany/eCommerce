import { useNavigate } from 'react-router-dom';
import './Header.scss';
import NavItem from '../navItem/NavItem';
import Button from '@mui/material/Button';
import useDispatchUserId from '../../../features/auth/hooks/useDispatchUserId';

const nav = [
  { text: 'Home', imgSrc: '/home2.png', path: '/main' },
  { text: 'Catalog', imgSrc: '/book2.png', path: '/catalog' },
  { text: 'Cart', imgSrc: '/cart.png', path: '/cart' },
  { text: 'Profile', imgSrc: '/hindu2.png', path: '/profile' },
];

const to = { SIGN_IN: '/sign-in', SIGN_UP: '/sign-up' };

const Header = () => {
  const navigate = useNavigate();
  const setUser = useDispatchUserId();
  const onClick = (to: string) => {
    setUser('Svetochka' + Math.random());
    navigate(to);
  };
  return (
    <header className="nav">
      <h2 className="nav-tittle">COOLSTORE</h2>
      {nav.map((navItem, index) => (
        <NavItem
          text={navItem.text}
          imgSrc={navItem.imgSrc}
          to={navItem.path}
          key={index}
        />
      ))}
      <div className="sign-container">
        <Button
          className="header-button"
          variant="contained"
          onClick={() => onClick(to.SIGN_IN)}
        >
          Sign In
        </Button>

        <Button
          className="header-button"
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
