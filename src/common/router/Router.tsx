import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../../App';
import SignIn from '../../features/auth/pages/SignIn';
import SignUp from '../../features/auth/pages/SignUp';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/main" replace />,
  },
  { path: '/main', element: <App /> },
  { path: '/sign-in', element: <SignIn /> },
  { path: '/sign-up', element: <SignUp /> },

]);
