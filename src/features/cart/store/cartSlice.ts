import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Cart } from '@commercetools/platform-sdk';

export type CartValue = Cart | null;

export interface CartState {
  value: CartValue;
}

const initialState: CartState = {
  value: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Cart>) => {
      state.value = action.payload;
    },
    emptyCart: (state) => {
      state.value = null;
    },
  },
});

export const { setCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
