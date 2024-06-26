import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './common/router/Router';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import muiTheme from './common/themes/muiTheme';
import { Provider } from 'react-redux';
import { store } from './common/store/store';
import CartLoader from './features/cart/components/cartLoader/CartLoader';

const theme = createTheme(muiTheme);

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CartLoader>
          <RouterProvider router={router} />
        </CartLoader>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
