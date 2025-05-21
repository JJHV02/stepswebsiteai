// Firebase Functions para la API de OpenAI
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { auth } from "../supabase/firebase";

const AIProfile = () => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setError("Usuario no autenticado.");
          setLoading(false);
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
          setError("No se encontró el perfil.");
        } else {
          setSummary(data?.perfil_ai?.summary || "Sin resumen aún.");
        }
      } catch (err) {
        console.error("Error de red o inesperado:", err);
        setError("Error de red o inesperado.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Perfil generado por IA</h2>
      {loading ? (
        <p>Cargando… perfil</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>{summary}</p>
      )}
    </div>
  );
};

export default AIProfile;
