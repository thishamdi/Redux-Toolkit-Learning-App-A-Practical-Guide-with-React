import { createSlice } from "@reduxjs/toolkit";

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cartItems", serializedState);
  } catch (e) {
    console.warn("Failed to save state to localStorage", e);
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cartItems");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.warn("Failed to load state from localStorage", e);
    return [];
  }
};

const initialState = {
  items: loadState(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.number === action.payload.number
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveState(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.number !== action.payload
      );
      saveState(state.items);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.number === action.payload.number
      );
      if (item) {
        item.quantity = action.payload.quantity;
        saveState(state.items);
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
