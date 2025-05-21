import React from 'react';
import '../styles/footer.css';
// En cualquier componente React, por ejemplo HomePage.js
import { supabase } from './supabaseClient'; // Ajusta la ruta si es necesario



const Footer = () => (
  <footer className="footer">
    © 2025 STEPS
  </footer>
);

export default Footer;

// src/styles/footer.css
