import { render, screen } from '@testing-library/react';
import SignUpForm from './SignUpForm';
import { Provider } from 'react-redux';

import { store } from '../../../../common/store/store';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../../../common/hooks/useApi', () => ({
  __esModule: true,
  default: jest.fn(() => [jest.fn(), false]),
}));

jest.mock('../../hooks/useDispatchUserId', () => jest.fn());
jest.mock('../../../../common/hooks/newUser', () => jest.fn());
jest.mock('../../../../common/hooks/useDispatchToast', () => jest.fn());
jest.mock('../../../../common/utils/crypto', () => ({
  encryptUser: jest.fn().mockReturnValue('encryptedUser'),
}));
jest.mock('../../../../common/api/sdk', () => ({
  removePreviousToken: jest.fn(),
}));
jest.mock('../../../catalog/utils/helpers', () => ({
  saveUserCart: jest.fn(),
}));

describe('SignUpForm component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpForm />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Register Form')).toBeTruthy();
    expect(screen.getByPlaceholderText('Name')).toBeTruthy();
    expect(screen.getByPlaceholderText('Last Name')).toBeTruthy();
    expect(screen.getByPlaceholderText('Email')).toBeTruthy();
    expect(screen.getByPlaceholderText('Password')).toBeTruthy();
    expect(screen.getByPlaceholderText('Date of Birth')).toBeTruthy();
    expect(screen.getByText('Shipping address')).toBeTruthy();
    expect(screen.getByText('Sign Up')).toBeTruthy();
  });
});
