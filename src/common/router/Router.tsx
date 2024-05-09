import { Navigate, createBrowserRouter } from 'react-router-dom';
import SignIn from '../../features/auth/pages/SignIn';
import SignUp from '../../features/auth/pages/SignUp';
import Main from '../../features/main/pages/Main';
import NotFound from '../pages/NotFound';
import Navigation from '../components/navigation/Navigation';

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
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
