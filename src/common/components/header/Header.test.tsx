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
});

describe('Header component', () => {
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
});

describe('Header component', () => {
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

    const cartNavItem = screen.getByRole('link', { name: /cart/i });
    expect(cartNavItem).toBeTruthy();
    expect(cartNavItem).toHaveAttribute('href', '/cart');
    expect(cartNavItem.querySelector('img')).toBeTruthy();
    expect(cartNavItem.querySelector('img')).toHaveAttribute(
      'src',
      '/cart.png'
    );
    expect(cartNavItem.querySelector('img')).toHaveAttribute('alt', 'Cart');

    // // Проверка Profile
    // const profileNavItem = screen.getByRole('link', { name: /profile/i });
    // expect(profileNavItem).toBeTruthy();
    // expect(profileNavItem).toHaveAttribute('href', '/profile');
    // expect(profileNavItem.querySelector('img')).toBeTruthy();
    // expect(profileNavItem.querySelector('img')).toHaveAttribute('src', '/hindu2.png');
    // expect(profileNavItem.querySelector('img')).toHaveAttribute('alt', 'Profile');
  });
});
