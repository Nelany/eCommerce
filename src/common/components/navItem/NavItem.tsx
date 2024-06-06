import { NavLink } from 'react-router-dom';
import './NavItem.scss';
import ItemsIndicator from '../../../features/cart/components/itemsIndicator/ItemsIndicator';

type Props = {
  text: string;
  imgSrc: string;
  to: string;
  id: string;
  className?: string;
};

const NavItem = ({ text, imgSrc, to, id }: Props) => {
  return (
    <NavLink
      id={id}
      to={to}
      className={({ isActive }) =>
        isActive ? 'nav-icon-container active' : 'nav-icon-container'
      }
    >
      <img className="nav-icon" src={imgSrc} alt={text} />
      {text.toUpperCase()}

      {id === 'cart' ? <ItemsIndicator /> : null}
    </NavLink>
  );
};

export default NavItem;
