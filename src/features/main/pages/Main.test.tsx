import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './Main';
import { Provider } from 'react-redux';
import { store } from '../../../common/store/store';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('App component', () => {
  it('renders the component correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const headingElement = getByText('COOLSTORE');
    expect(headingElement).toBeTruthy();
  });

  it('displays the correct image', () => {
    const { getByAltText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const genieImage = getByAltText(
      'Photo of the beast Genie'
    ) as HTMLImageElement;
    expect(genieImage.getAttribute('src')).toBe(
      '/1696526421_gas-kvas-com-p-kartinki-dzhin-9.png'
    );
  });

  it('displays the promo code', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(getByText('promoForBestStudents')).toBeTruthy();
  });
});
