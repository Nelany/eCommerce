import { Outlet } from 'react-router-dom';
import Header from '../header/Header';

const Navigation = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Navigation;
