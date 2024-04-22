import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./todoSlice";
import userReducer from "./userSlice"; // Import the user reducer

export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
    users: userReducer, // Add the user reducer
  },
});
