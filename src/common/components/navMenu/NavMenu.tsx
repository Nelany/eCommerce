import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from 'react-router-dom';
import './NavMenu.scss';
import { SyntheticEvent, useState } from 'react';


const navItems = [
  { label: 'Home', imgSrc: '/home2.png', path: '/main' },
  { label: 'Catalog', imgSrc: '/book2.png', path: '/catalog' },
  { label: 'Cart', imgSrc: '/cart.png', path: '/cart' },
  { label: 'Profile', imgSrc: '/hindu2.png', path: '/profile' },
];

let page = 0;

const NavMenu = () => {
  const [value, setValue] = useState(page);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  const onClick = (to: string, index: number) => {
    navigate(to);
    // setValue(index);
    page = index;
  };

  return (
    <BottomNavigation
      className="nav-container"
      value={value}
      onChange={handleChange}
    >
      {navItems.map((item, index) => (
        <BottomNavigationAction
          onClick={() => onClick(item.path, index)}
          classes={{ root: 'nav-button' }}
          key={index}
          showLabel
          label={item.label}
          icon={<img className="nav-icon" src={item.imgSrc} alt={item.label} />}
        />
      ))}
    </BottomNavigation>
  );
};

export default NavMenu;
