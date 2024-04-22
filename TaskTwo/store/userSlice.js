// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (user) => ({
        payload: {
          id: Date.now(),
          ...user,
        },
      }),
    },
    deleteUser: (state, action) => {
      return state.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      const user = state.find((user) => user.id === action.payload.id);
      if (user) {
        Object.assign(user, action.payload);
      }
    },
  },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
