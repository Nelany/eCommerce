import { setUser, userSlice, UserState } from './userSlice';

describe('user slice', () => {
  const initialState: UserState = {
    value: '',
  };

  it('should handle setUser', () => {
    const newState = userSlice.reducer(initialState, setUser('newUserId'));
    expect(newState.value).toEqual('newUserId');
  });

  it('should return the initial state', () => {
    expect(userSlice.reducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should not mutate the initial state', () => {
    const state = userSlice.reducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });
});
