import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username || !email || !role) {
      alert("Please fill in all fields!");
      return;
    }

    alert(`Welcome, ${username}! You've registered as a ${role}.`);
    navigate("/login");
  };

  return (
    <div className="register-3d-wrapper">
      <div className="register-3d-card">
        <h2>🖌️ Register for Virtual Art Gallery</h2>
        <form onSubmit={handleRegister} className="register-form">
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="visitor">Visitor</option>
            <option value="artist">Artist</option>
            <option value="curator">Curator</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Register</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;