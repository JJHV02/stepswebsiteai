// src/components/Layout.js
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow px-6">{children}</main>
    <Footer />
  </div>
);

export default Layout;

// src/components/Layout.js
