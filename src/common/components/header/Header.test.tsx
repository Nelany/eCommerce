import { render, screen } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import '@testing-library/jest-dom';

jest.mock('../../utils/constants');

describe('Header component', () => {
  it('renders the component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeTruthy();
  });

  it('renders the store name correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    const storeNameElement = screen.getByText('COOLSTORE');
    expect(storeNameElement).toBeTruthy();
  });

  it('renders navigation items correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const homeNavItem = screen.getByRole('link', { name: /home/i });
    expect(homeNavItem).toBeTruthy();
    expect(homeNavItem).toHaveAttribute('href', '/main');
    expect(homeNavItem.querySelector('img')).toBeTruthy();
    expect(homeNavItem.querySelector('img')).toHaveAttribute(
      'src',
      '/home2.png'
    );
    expect(homeNavItem.querySelector('img')).toHaveAttribute('alt', 'Home');

    const catalogNavItem = screen.getByRole('link', { name: /catalog/i });
    expect(catalogNavItem).toBeTruthy();
    expect(catalogNavItem).toHaveAttribute('href', '/catalog');
    expect(catalogNavItem.querySelector('img')).toBeTruthy();
    expect(catalogNavItem.querySelector('img')).toHaveAttribute(
      'src',
      '/book2.png'
    );
    expect(catalogNavItem.querySelector('img')).toHaveAttribute(
      'alt',
      'Catalog'
    );

    const aboutNavItem = screen.getByRole('link', { name: /about/i });
    expect(aboutNavItem).toBeTruthy();
    expect(aboutNavItem).toHaveAttribute('href', '/about');
    expect(aboutNavItem.querySelector('img')).toBeTruthy();
    expect(aboutNavItem.querySelector('img')).toHaveAttribute(
      'src',
      '/searchicon.png'
    );
    expect(aboutNavItem.querySelector('img')).toHaveAttribute('alt', 'About');

    const cartNavItem = screen.getByRole('link', { name: /cart/i });
    expect(cartNavItem).toBeTruthy();
    expect(cartNavItem).toHaveAttribute('href', '/cart');
    expect(cartNavItem.querySelector('img')).toBeTruthy();
    expect(cartNavItem.querySelector('img')).toHaveAttribute(
      'src',
      '/cart.png'
    );
    expect(cartNavItem.querySelector('img')).toHaveAttribute('alt', 'Cart');
  });
});
