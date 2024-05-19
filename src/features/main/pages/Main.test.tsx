import { render } from '@testing-library/react';
import App from './Main';

describe('App component', () => {
  it('renders the component correctly', () => {
    const { getByText } = render(<App />);
    const headingElement = getByText('COOLSTORE');
    expect(headingElement).toBeTruthy();
  });
});
