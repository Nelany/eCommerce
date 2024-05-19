import { setCart, emptyCart, cartSlice, CartState } from './cartSlice';

describe('cart slice', () => {
  const initialState: CartState = {
    value: '',
  };

  it('should handle setCart', () => {
    const newState = cartSlice.reducer(initialState, setCart('new cart value'));
    expect(newState.value).toEqual('new cart value');
  });

  it('should handle emptyCart', () => {
    const state = { value: 'current cart value' };
    const newState = cartSlice.reducer(state, emptyCart());
    expect(newState.value).toEqual('');
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
