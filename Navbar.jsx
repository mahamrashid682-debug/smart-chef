import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ChefHat, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function signOut() {
    logout();
    navigate("/");
  }

  return (
    <header className="topbar">
      <Link className="brand" to="/">
        <span className="brandIcon"><ChefHat size={23} /></span>
        <span>SMART CHEF</span>
      </Link>
      <button className="iconButton menuButton" onClick={() => setOpen(!open)} aria-label="Open menu">
        <Menu size={22} />
      </button>
      <nav className={open ? "nav open" : "nav"}>
        <NavLink to="/mistake-fixer">Mistake Fixer</NavLink>
        <NavLink to="/recipes">Recipes</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        {user ? (
          <button className="ghostButton" onClick={signOut}><LogOut size={17} /> Logout</button>
        ) : (
          <NavLink className="primaryLink" to="/auth">Login / Signup</NavLink>
        )}
      </nav>
    </header>
  );
}
