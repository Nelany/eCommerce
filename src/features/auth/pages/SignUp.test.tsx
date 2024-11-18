import { render } from '@testing-library/react';
import SignUp from './SignUp';

jest.mock('../components/signUpForm/SignUpForm', () => () => (
  <div>Mocked SignUpForm</div>
));
jest.mock('../../../common/utils/constants');
describe('SignUp component', () => {
  it('renders without crashing', () => {
    const { container } = render(<SignUp />);
    expect(container).toBeTruthy();
  });

  it('contains the SignUpForm component', () => {
    const { getByText } = render(<SignUp />);
    const signUpFormElement = getByText('Mocked SignUpForm');
    expect(signUpFormElement).toBeTruthy();
  });

  it('has the correct CSS class', () => {
    const { container } = render(<SignUp />);
    const pageElement = container.querySelector('.page.auth-page');
    expect(pageElement).toBeTruthy();
  });
});
