import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './common/router/Router';

  const rootElement = document.createElement('div');
  rootElement.id = 'root';
  document.body.appendChild(rootElement);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);
