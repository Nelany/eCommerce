import { Link } from 'react-router-dom';
import './Header.scss';
import NavItem from '../navItem/NavItem';
import Button from '@mui/material/Button';


const nav = [
  { text: 'Home', imgSrc: '/src/assets/home2.png' },
  { text: 'Catalog', imgSrc: '/src/assets/book2.png' },
  { text: 'Cart', imgSrc: '/src/assets/cart.png' },
  { text: 'Profile', imgSrc: '/src/assets/hindu2.png' },
];
const Header = () => {
  return (
    <header className="nav">
      {nav.map((navItem) => (
        <NavItem text={navItem.text} imgSrc={navItem.imgSrc} />
      ))}
      <div className="sign-container">
        <Button
          style={{ backgroundColor: '#091D9E' }}
          variant="contained"
        >
          Contained
        </Button>

        <Link to={'/sign-in'}>Sign In</Link>
        <Link to={'/sign-up'}>Sign Up</Link>
      </div>
    </header>
  );
};

export default Header;
