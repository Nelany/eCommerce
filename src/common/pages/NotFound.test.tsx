import { render } from '@testing-library/react';
import NotFound from './NotFound';

describe('NotFound component', () => {
  it('renders the component correctly', () => {
    const { getByText } = render(<NotFound />);
    const headingElement = getByText('404 PAGE NOT FOUND');
    expect(headingElement).toBeTruthy();
  });

  it('has the correct CSS class', () => {
    const { container } = render(<NotFound />);
    const pageElement = container.querySelector('.page.not-found-page');
    expect(pageElement).toBeTruthy();
  });
});
