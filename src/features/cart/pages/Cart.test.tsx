import { render } from '@testing-library/react';
import Cart from './Cart';

describe('Cart component', () => {
  it('renders the component correctly', () => {
    const { getByText } = render(<Cart />);
    const headingElement = getByText('CART');
    expect(headingElement).toBeTruthy();
  });

  it('has the correct heading', () => {
    const { getByText } = render(<Cart />);
    const headingElement = getByText('CART');
    expect(headingElement).toBeTruthy();
  });

  it('has the correct CSS class', () => {
    const { container } = render(<Cart />);
    const pageElement = container.querySelector('.page.cart-page');
    expect(pageElement).toBeTruthy();
  });
});
