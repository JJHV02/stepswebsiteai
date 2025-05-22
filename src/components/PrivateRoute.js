import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [redirectToComplete, setRedirectToComplete] = useState(false);

  useEffect(() => {
    const checkAuthAndProfile = async () => {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        setAuthorized(false);
        setLoading(false);
        return;
      }
      const { data: profile, error: profileError } = await supabase
        .from("ai_profiles")
        .select("id")
        .eq("supabase_uid", user.id)
        .single();

      if (profileError || !profile) {
        setRedirectToComplete(true);
      } else {
        setAuthorized(true);
      }
      setLoading(false);
    };

    checkAuthAndProfile();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  if (redirectToComplete) {
    return <Navigate to="/complete-profile" replace />;
  }

  return children;
};

export default PrivateRoute;