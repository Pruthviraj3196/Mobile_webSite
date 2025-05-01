import { createSlice } from '@reduxjs/toolkit';

const savedUser = JSON.parse(localStorage.getItem('user'));

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: savedUser?.token || null,
    role: savedUser?.role || null,
  },
  reducers: {
    setUser(state, action) {
      state.token = action.payload.token;
      state.role = action.payload.role;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Save both token and role
    },
    logout(state) {
      state.token = null;
      state.role = null;
      localStorage.removeItem('user');
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
