import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../features/auth/store/userSlice';
import cartReducer from '../../features/cart/store/cartSlice';
import categoriesReducer from '../../features/catalog/store/categorySlice';
import selectedCategoryReducer from '../../features/catalog/store/selectedCategorySlice';
import sortReducer from '../../features/catalog/store/sortSlice';



import toastReducer from './toastSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    toast: toastReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    selectedCategoryId: selectedCategoryReducer,
    sort: sortReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
