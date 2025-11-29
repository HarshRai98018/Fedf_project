import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !role) {
      alert("Please enter your name and select a role!");
      return;
    }

    // Redirect based on role
    if (role === "visitor") navigate("/visitor");
    else if (role === "artist") navigate("/artist");
    else if (role === "curator") navigate("/curator");
    else if (role === "admin") navigate("/admin");
  };

  return (
    <div className="login-container">
      <h2>🎨 Virtual Art Gallery</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="visitor">Visitor</option>
          <option value="artist">Artist</option>
          <option value="curator">Curator</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Login</button>
        <p className="register-link">
  Don't have an account? <Link to="/register">Register here</Link>
</p>

      </form>
    </div>
  );
};

export default LoginPage;
