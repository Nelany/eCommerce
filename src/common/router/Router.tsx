import { Navigate, createBrowserRouter, redirect } from 'react-router-dom';
import SignIn from '../../features/auth/pages/SignIn';
import SignUp from '../../features/auth/pages/SignUp';
import Main from '../../features/main/pages/Main';
import NotFound from '../pages/NotFound';
import Navigation from '../components/navigation/Navigation';
import Cart from '../../features/cart/pages/Cart';
import Catalog from '../../features/catalog/pages/Catalog';
import Profile from '../../features/profile/pages/Profile';

const loader = async () => {
  const user = localStorage.getItem('userId');
  if (user) {
    throw redirect('/main');
  }
  return null;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigation />,
    children: [
      {
        index: true,
        element: <Navigate replace to={'main'} />,
      },
      { path: '/main', element: <Main /> },
      { path: '/sign-in', loader, element: <SignIn /> },
      { path: '/sign-up', loader, element: <SignUp /> },
      { path: '/cart', element: <Cart /> },
      { path: '/catalog', element: <Catalog /> },
      { path: '/profile', element: <Profile /> },

      { path: '*', element: <NotFound /> },
    ],
  },
]);
