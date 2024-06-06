import { useNavigate } from 'react-router-dom';
import './Header.scss';
import NavItem from '../navItem/NavItem';
import Button from '@mui/material/Button';
import useDispatchUserId from '../../../features/auth/hooks/useDispatchUserId';
import useSelectUser from '../../../features/auth/hooks/useSelectUser';
import useDispatchCartId from '../../../features/cart/hooks/useDispatchCart';
import { useNavigateToMain } from '../../hooks/useNavigateToMain';
import { removePreviousToken } from '../../api/sdk';

const nav = [
  { text: 'Home', imgSrc: '/home2.png', path: '/main' },
  { text: 'Catalog', imgSrc: '/book2.png', path: '/catalog' },
  { text: 'About', imgSrc: 'searchicon.png', path: '/about' },
  { text: 'Cart', imgSrc: '/cart.png', path: '/cart' },
  { text: 'Profile', imgSrc: '/hindu2.png', path: '/profile' },
];

const to = { SIGN_IN: '/sign-in', SIGN_UP: '/sign-up' };

const Header = () => {
  const navigateToMain = useNavigateToMain();
  const navigate = useNavigate();
  const setUser = useDispatchUserId();
  const userId = useSelectUser();
  const { dispatchEmptyCart } = useDispatchCartId();
  const filteredNav = userId ? nav : nav.slice(0, -1);

  const onClick = (to: string) => {
    navigate(to);
  };
  const logOut = () => {
    removePreviousToken();
    setUser('');
    dispatchEmptyCart();
    localStorage.removeItem('userSecret');
    localStorage.removeItem('cartData');
    navigateToMain();
  };
  return (
    <header className="nav">
      <h2 className="nav-tittle">COOLSTORE</h2>
      <div className="nav-container">
        {filteredNav.map((navItem, index) => (
          <NavItem
            text={navItem.text}
            imgSrc={navItem.imgSrc}
            to={navItem.path}
            key={index}
          />
        ))}
      </div>

      <div className="sign-container">
        {userId ? (
          <>
            <Button
              className="header-button"
              variant="contained"
              onClick={() => logOut()}
            >
              Log Out
            </Button>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
