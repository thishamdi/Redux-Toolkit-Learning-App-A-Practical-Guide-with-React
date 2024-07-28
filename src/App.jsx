import { Routes, Route, Navigate } from "react-router-dom";
import { Cart, Home, Login } from "./pages";

import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.users);
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div className={`app ${theme}`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        {!user.isAuthenticated ? (
          <Route path="/login" element={<Login />} />
        ) : (
          <Route path="/login" element={<Navigate to="/" />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
