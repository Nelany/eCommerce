import { NavLink } from 'react-router-dom';
import './NavItem.scss';

type Props = { text: string; imgSrc: string; to: string; className?: string };

const NavItem = ({ text, imgSrc, to }: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? 'nav-icon-container active' : 'nav-icon-container'
      }
    >
      <img className="nav-icon" src={imgSrc} alt={text} />
      {text.toUpperCase()}
    </NavLink>
  );
};

export default NavItem;
