import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FilterDispatch } from '../types/catalogTypes';

export interface FiltersState {
  value: FilterDispatch;
}

const initialState: FiltersState = {
  value: {
    maxPrice: '100000000',
    minPrice: '0',
    country: 'All',
    discount: false,
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterDispatch>) => {
      state.value = { ...state.value, ...action.payload };
    },
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
