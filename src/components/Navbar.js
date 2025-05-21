import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <Link to="/">Start</Link>
    <Link to="/transform">Transform</Link>
    <Link to="/excel">Excel</Link>
    <Link to="/professionalize">Professionalize</Link>
    <Link to="/success">Success</Link>
    <Link to="/Perfilamiento Inteligente con Firestore">Perfilamiento Inteligente con Firestore</Link>
    <Link to="/AIProfile">AI Profile</Link>
  </nav>
);

export default Navbar;

// src/styles/navbar.css


