import { render } from '@testing-library/react';
import Catalog from './Catalog';

describe('Catalog component', () => {
  it('renders the component correctly', () => {
    const { getByText } = render(<Catalog />);
    const headingElement = getByText('CATALOG');
    expect(headingElement).toBeTruthy();
  });

  it('has the correct heading', () => {
    const { getByText } = render(<Catalog />);
    const headingElement = getByText('CATALOG');
    expect(headingElement).toBeTruthy();
  });

  it('has the correct CSS class', () => {
    const { container } = render(<Catalog />);
    const pageElement = container.querySelector('.page.catalog-page');
    expect(pageElement).toBeTruthy();
  });
});
