import React, { useState } from "react";
import { Navbar } from "../../components";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

export function Login() {
  const theme = useSelector((state) => state.theme.mode);

  const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    dispatch(login(username));
    setUsername("");
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className={`login-container container ${theme}`}>
        <div className="login-form">
          <span>
            <h3 className="login-title">&#9889; My name is,</h3>
            <input
              type="text"
              placeholder="..."
              maxLength="12"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="login-input"
            />
          </span>
          <button onClick={handleSubmit} className="login-button">
            Go!
          </button>
        </div>
      </div>
    </>
  );
}
