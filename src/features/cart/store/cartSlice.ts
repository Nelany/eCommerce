import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CartState {
  value: string;
}

const initialState: CartState = {
  value: '',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    emptyCart: (state) => {
      state.value = '';
    },
  },
});

export const { setCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
