import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Toast from '../Toast/Toast';

const Navigation = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Toast />
    </div>
  );
};

export default Navigation;
