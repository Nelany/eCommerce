import { render } from '@testing-library/react';
import SignIn from './SignIn';

jest.mock('../components/signInForm/SignInForm', () => () => (
  <div>Mocked SignInForm</div>
));

describe('SignIn component', () => {
  it('renders without crashing', () => {
    const { container } = render(<SignIn />);
    expect(container).toBeTruthy();
  });

  it('contains the SignInForm component', () => {
    const { getByText } = render(<SignIn />);
    const signInFormElement = getByText('Mocked SignInForm');
    expect(signInFormElement).toBeTruthy();
  });

  it('has the correct CSS class', () => {
    const { container } = render(<SignIn />);
    const pageElement = container.querySelector('.page.auth-page');
    expect(pageElement).toBeTruthy();
  });
});
