import React, { useEffect, useState } from "react";
import { Navigate, useLocation }      from "react-router-dom";
import { supabase }                   from "../lib/supabaseClient";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading]         = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasProfile, setHasProfile]   = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuthAndProfile = async () => {
      // 1) Checa sesión
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      setIsAuthenticated(true);

      // 2) Checa perfil en ai_profiles
      const { data: { user } } = await supabase.auth.getUser();
      const { data: profileData, error: profileError } = await supabase
        .from("ai_profiles")
        .select("id")
        .eq("supabase_uid", user.id)
        .single();

      if (profileError && profileError.code === "PGRST116") {
        setHasProfile(false);
      } else if (profileError) {
        console.error("Error al consultar perfil:", profileError);
        setHasProfile(false);
      } else {
        setHasProfile(true);
      }

      setLoading(false);
    };

    checkAuthAndProfile();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si intenta ver AIProfile sin perfil, redirige a completar
  if (location.pathname === "/ai-profile" && hasProfile === false) {
    return <Navigate to="/complete-profile" replace />;
  }

  return children;
};

export default PrivateRoute;