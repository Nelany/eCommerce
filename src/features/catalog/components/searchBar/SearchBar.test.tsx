import { render, screen } from '@testing-library/react';
import { SearchBar } from './SearchBar';

import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../../../common/store/store';
import { MemoryRouter } from 'react-router-dom';

describe('SearchBar component', () => {
  const setSearchValueMock = jest.fn();

  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchBar changeSearchInput={setSearchValueMock} />
        </MemoryRouter>
      </Provider>
    );
  });

  it('renders SearchInput, SortSelect, and Drawer components', () => {
    expect(screen.getByTestId('sort-select')).toBeTruthy();
    expect(screen.getByTestId('burger-menu')).toBeTruthy();
  });

  it('opens the drawer when the menu button is clicked', () => {
    const menuButton = screen.getByTestId('burger-menu');
    userEvent.click(menuButton);
    expect(screen.getByText('CATEGORIES')).toBeTruthy();
  });
});
