## Detailed Code Explanation

### App Component

The `App` component sets up the main structure of the application. It uses `React Router` for navigation and `Redux` for state management.

#### Key Points:
- **Routes Setup**: Defines routes for the home page (`/`), cart page (`/cart`), and login page (`/login`).
- **Conditional Rendering**: Redirects authenticated users from the login page to the home page.
- **Theming**: Applies dynamic theming based on the current theme state.

### Redux Slices

#### Book Slice

The `bookSlice` manages the state related to books, including fetching data from an API.

**Key Points:**
- **State Management**: Holds the state for books, status, and errors.
- **Async Thunks**: Uses `createAsyncThunk` for fetching books from an external API asynchronously.
- **Reducers**: Updates state based on the fetch status (loading, succeeded, failed).

```javascript
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get("https://potterapi-fedeperin.vercel.app/en/books");
  return response.data;
});
```

#### Cart Slice

The `cartSlice` manages the state of items in the shopping cart, with persistent storage in `localStorage`.

**Key Points:**
- **Persistent State**: Saves and loads cart state from `localStorage`.
- **Reducers**: Handles adding, removing, and updating cart items.

```javascript
reducers: {
  addToCart: (state, action) => {
    const existingItem = state.items.find(item => item.number === action.payload.number);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      state.items.push({ ...action.payload, quantity: 1 });
    }
    saveState(state.items);
  },
  ...
}
```

#### Theme Slice

The `themeSlice` manages the application's theme state, allowing users to toggle between light and dark modes.

**Key Points:**
- **Persistent Theme**: Saves the theme state to `localStorage`.
- **Reducers**: Toggles and sets the theme.

```javascript
reducers: {
  toggleTheme: (state) => {
    state.mode = state.mode === "light" ? "dark" : "light";
    localStorage.setItem("theme", state.mode);
  },
  ...
}
```

#### User Slice

The `userSlice` manages user authentication state, with persistent storage in `localStorage`.

**Key Points:**
- **Persistent Auth State**: Saves and loads the authentication state from `localStorage`.
- **Reducers**: Handles login and logout actions.

```javascript
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
}
```

### Home Component

The `Home` component displays the list of books fetched from the API, allowing users to add books to the cart.

**Key Points:**
- **Data Fetching**: Fetches book data on component mount using `useEffect`.
- **State Access**: Uses `useSelector` to access books, status, and error from the Redux store.
- **Actions Dispatching**: Dispatches `addToCart` action when a user adds a book to the cart.

```javascript
useEffect(() => {
  if (bookStatus === null) {
    dispatch(fetchBooks());
  }
}, [bookStatus, dispatch]);

const handleAddToCart = (book) => {
  dispatch(addToCart(book));
};
```

## Learning Outcomes

By exploring and understanding this app, visitors will learn:

1. **React-Redux Integration**: How to integrate Redux Toolkit with a React application for efficient state management.
2. **Asynchronous Logic Handling**: The use of `createAsyncThunk` for managing asynchronous operations in Redux.
3. **Persistent State Management**: Techniques for saving and loading state from `localStorage`.
4. **Dynamic Theming**: Implementation of a theme toggle feature with persistent state.
5. **Conditional Routing**: Using `React Router` for setting up routes and conditional redirects based on authentication state.
6. **Component and State Interaction**: Best practices for accessing and dispatching Redux state in functional components.
