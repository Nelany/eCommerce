import { render } from '@testing-library/react';
import Cart from './Cart';
import { Provider } from 'react-redux';
import { store } from '../../../common/store/store';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../../common/utils/constants');

describe('Cart component', () => {
  it('renders the component correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    );
    const headingElement = getByText('CART');
    expect(headingElement).toBeTruthy();
  });

  it('has the correct heading', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    );
    const headingElement = getByText('CART');
    expect(headingElement).toBeTruthy();
  });

  it('has the correct CSS class', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    );
    const pageElement = container.querySelector('.page.cart-page');
    expect(pageElement).toBeTruthy();
  });
});
