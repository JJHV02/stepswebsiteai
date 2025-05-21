// src/components/PrivateRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const PrivateRoute = ({ children }) => {
  // undefined = checking auth, null = no session, object = session present
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    // 1) initial session fetch
    supabase.auth.getSession().then(({ data, error }) => {
      console.log("getSession →", data, error);
      setSession(data.session);
    });

    // 2) listen for changes
    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      console.log("onAuthStateChange →", newSession);
      setSession(newSession);
    });

    // 3) cleanup
    return () => {
      if (data?.subscription) {
        data.subscription.unsubscribe();
      }
    };
  }, []);

  if (session === undefined) {
    return <p>Cargando autenticación…</p>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
