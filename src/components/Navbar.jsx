import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ username = "Guest" }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">🎨 Virtual Gallery</h1>
      </div>

      <div className="navbar-links">
        <Link to="/visitor">Visitor</Link>
        <Link to="/artist">Artist</Link>
        <Link to="/curator">Curator</Link>
        <Link to="/admin">Admin</Link>
      </div>

      <div className="navbar-right">
        <span className="navbar-user">Welcome, {username}</span>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}
