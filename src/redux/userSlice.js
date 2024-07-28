import { createSlice } from "@reduxjs/toolkit";

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("authState", serializedState);
  } catch (e) {
    console.warn("Failed to save state to localStorage", e);
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    return serializedState
      ? JSON.parse(serializedState)
      : { username: null, isAuthenticated: false };
  } catch (e) {
    console.warn("Failed to load state from localStorage", e);
    return { username: null, isAuthenticated: false };
  }
};

const initialState = loadState();

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload;
      state.isAuthenticated = true;
      saveState(state);
    },
    logout: (state) => {
      state.username = null;
      state.isAuthenticated = false;
      localStorage.removeItem("authState");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
