import { render, screen, fireEvent } from '@testing-library/react';
import { Drawer } from './Drawer';
import { store } from '../../../../common/store/store';
import { Provider } from 'react-redux';

describe('Drawer component', () => {
  it('renders the component with closed drawer', () => {
    render(
      <Provider store={store}>
        <Drawer />
      </Provider>
    );

    expect(screen.getByText('CATEGORIES')).toBeTruthy();
    expect(screen.getByText('FILTERS')).toBeTruthy();

    expect(screen.queryByText('Max, $')).not.toBeTruthy();
    expect(screen.queryByText('Country')).not.toBeTruthy();
    expect(screen.queryByText('Discount')).not.toBeTruthy();
  });

  it('opens the drawer when the menu button is clicked', () => {
    render(
      <Provider store={store}>
        <Drawer />
      </Provider>
    );

    // Проверяем, что ящик закрыт изначально
    expect(screen.queryByText('Max, $')).not.toBeTruthy();

    // Кликаем на кнопку меню
    fireEvent.click(screen.getByTestId('burger-menu'));
    // Проверяем, что ящик открыт и элементы отрисованы
    expect(screen.getByText('CATEGORIES')).toBeTruthy();
    expect(screen.getByText('FILTERS')).toBeTruthy();
  });

  // Добавьте другие тесты здесь, включая взаимодействие с элементами внутри ящика
});
