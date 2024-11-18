import { render } from '@testing-library/react';
import Toast from './Toast';
import useSelectToast from '../../hooks/useSelectToast';
import useDispatchToast from '../../hooks/useDispatchToast';

jest.mock('../../hooks/useSelectToast', () => jest.fn());
jest.mock('../../hooks/useDispatchToast', () => jest.fn());

describe('Toast component', () => {
  const setToastMock = jest.fn();

  beforeEach(() => {
    setToastMock.mockClear();
    (useDispatchToast as jest.Mock).mockReturnValue(setToastMock);
  });

  it('does not render when toast is closed', () => {
    (useSelectToast as jest.Mock).mockReturnValue({
      message: 'Test message',
      type: 'success',
      isToastOpen: false,
    });

    const { queryByText } = render(<Toast />);

    expect(queryByText('Test message')).toBeNull();
  });
});
