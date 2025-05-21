// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../supabase/firebase";

const PrivateRoute = ({ children }) => {
  const user = auth.currentUser;
  return user ? children : <Navigate to="/Login" />;
};

export default PrivateRoute;

// src/components/PrivateRoute.js