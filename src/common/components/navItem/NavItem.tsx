import './NavItem.scss';

type Props = { text: string; imgSrc: string; className?: string };

const NavItem = ({ text, imgSrc, className }: Props) => {
  return (
    <div className={`nav-icon-container ${className}`}>
      <img className="nav-icon" src={imgSrc} alt={text} />
      {text.toUpperCase()}
    </div>
  );
};

export default NavItem;
