import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";
import themeReducer from "./redux/themeSlice";
import bookReducer from "./redux/bookSlice";
import cartReducer from "./redux/cartSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    theme: themeReducer,
    books: bookReducer,
    cart: cartReducer,
  },
});
