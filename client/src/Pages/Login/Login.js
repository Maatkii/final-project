import React, { useState } from "react";
import "./style.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Here you would typically perform authentication, for example, sending a request to a server
    // For simplicity, let's just check if the username and password match 'admin' and 'password'
    if (username === "email" && password === "password") {
      setLoggedIn(true);
    } else {
      alert("Invalid email or password");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  if (loggedIn) {
    return (
      <div>
        <p>Welcome, {username}!</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }
  return (
    <div className="form-login">
      <div className="Login">
        {/* <h1>LOGIN</h1> */}
        <div className="form">
          <i class="fa-solid fa-user"></i>
          <input
            type="email"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <i class="fa-solid fa-lock  "></i>

          <input
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="remember-box">
            <div>
              <input type="checkbox" value={false} />
              <label>Remember me</label>
            </div>
            <p>forget Password?</p>
          </div>
          <button onClick={handleLogin} className="btn btn-info btn-login">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
