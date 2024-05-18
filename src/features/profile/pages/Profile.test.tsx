import { render } from '@testing-library/react';
import Profile from './Profile';

describe('Profile component', () => {
  it('renders the component correctly', () => {
    const { getByText } = render(<Profile />);
    const headingElement = getByText('PROFILE');
    expect(headingElement).toBeTruthy();
  });

  it('has the correct heading', () => {
    const { getByText } = render(<Profile />);
    const headingElement = getByText('PROFILE');
    expect(headingElement).toBeTruthy();
  });

  it('has the correct CSS class', () => {
    const { container } = render(<Profile />);
    const pageElement = container.querySelector('.page.profile-page');
    expect(pageElement).toBeTruthy();
  });
});
