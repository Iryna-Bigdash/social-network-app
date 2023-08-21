export const initialState = {
    user: {},
    post: {},
    comment: {}
}

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      // Оновити дані користувача в стані
      return { ...state, ...action.payload };
    },
    // Інші дії та редуктори, якщо потрібно
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;