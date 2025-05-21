// src/components/AIProfile.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import { auth } from "../supabase/firebase";

const AIProfile = () => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate("/Login"); // Redirige si no hay sesión
          return;
        }

        const uid = user.uid;
        const { data, error } = await supabase
          .from("ai_profiles")
          .select("perfil_ai")
          .eq("firebase_uid", uid)
          .single();

        if (error) {
          console.error("Error fetching profile:", error.message);
          setError("No se encontró el perfil del usuario.");
        } else {
          setSummary(data?.perfil_ai?.summary || "Sin resumen aún.");
        }
      } catch (err) {
        console.error("Error inesperado:", err);
        setError("Error inesperado al cargar el perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <p>Cargando… perfil</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Perfil generado por IA</h2>
      <p>{summary}</p>
    </div>
  );
};

export default AIProfile;

// src/components/AIProfile.js