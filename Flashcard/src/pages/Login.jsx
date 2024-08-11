import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DEFAULT_CREDENTIALS = { username: "admin", password: "password" };

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (
      username === DEFAULT_CREDENTIALS.username &&
      password === DEFAULT_CREDENTIALS.password
    ) {
      onLogin();
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col p-4 w-1/3">
        <h2 className="text-xl text-center font-bold mb-6">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded-lg w-full mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded-lg w-full mb-4"
        />
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-500 self-center text-white rounded-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
