import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { store } from '../../../../common/store/store';
import { Provider } from 'react-redux';
import { Drawer } from './Drawer';
import { setCategories } from '../../store/categorySlice';

describe('Drawer component', () => {
  const categories = [
    {
      id: '1',
      name: 'Category 1',
      children: [
        {
          id: '1-1',
          name: 'Subcategory 1-1',
        },
      ],
    },
    {
      id: '2',
      name: 'Category 2',
    },
  ];

  beforeEach(() => {
    store.dispatch(setCategories(categories));
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/catalog']}>
          <Routes>
            <Route path="/catalog" element={<Drawer />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });

  it('renders the component with closed drawer', () => {
    expect(screen.getByTestId('burger-menu')).toBeTruthy();

    expect(screen.queryByText('CATEGORIES')).toBeTruthy();
    expect(screen.queryByText('FILTERS')).toBeTruthy();
  });

  it('opens the drawer when the menu button is clicked', async () => {
    fireEvent.click(screen.getByTestId('burger-menu'));

    await waitFor(() => {
      expect(screen.getByText('CATEGORIES')).toBeTruthy();
      expect(screen.getByText('FILTERS')).toBeTruthy();
    });
  });

  it('renders all categories and subcategories when CATEGORIES is clicked', async () => {
    fireEvent.click(screen.getByTestId('burger-menu'));

    const categoriesElement = await screen.findByText('CATEGORIES');
    fireEvent.click(categoriesElement);

    await waitFor(() => {
      categories.forEach((category) => {
        expect(screen.findByText(category.name)).toBeTruthy();

        if (category.children) {
          category.children.forEach((subCategory) => {
            expect(screen.findByText(subCategory.name)).toBeTruthy();
          });
        }
      });
    });
  });
});
