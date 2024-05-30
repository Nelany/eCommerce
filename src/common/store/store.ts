import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../features/auth/store/userSlice';
import cartReducer from '../../features/cart/store/cartSlice';
import categoriesReducer from '../../features/catalog/store/categorySlice';

import toastReducer from './toastSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    toast: toastReducer,
    cart: cartReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
