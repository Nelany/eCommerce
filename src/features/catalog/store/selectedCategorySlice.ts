import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SelectedCategoryState {
  value: string;
}

const initialState: SelectedCategoryState = {
  value: '',
};

export const selectedCategorySlice = createSlice({
  name: 'selectedCategory',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedCategory } = selectedCategorySlice.actions;

export default selectedCategorySlice.reducer;
