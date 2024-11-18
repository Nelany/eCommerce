import { setCart, emptyCart, cartSlice, CartState } from './cartSlice';
import { testCart } from '../utils/testCart';

describe('cart slice', () => {
  const initialState: CartState = {
    value: null,
  };

  it('should handle setCart', () => {
    const newState = cartSlice.reducer(initialState, setCart(testCart));
    expect(newState.value).toEqual(testCart);
  });

  it('should handle emptyCart', () => {
    const state = { value: testCart };
    const newState = cartSlice.reducer(state, emptyCart());
    expect(newState.value).toEqual(null);
  });

  it('should return the initial state', () => {
    expect(cartSlice.reducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should not mutate the initial state', () => {
    const state = cartSlice.reducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });
});
