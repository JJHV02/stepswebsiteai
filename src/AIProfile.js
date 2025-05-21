// src/components/AIProfile.js
import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const AIProfile = () => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      // 1) Get the current user from Supabase auth
      const { data: { user }, error: authErr } = await supabase.auth.getUser();
      if (authErr || !user) {
        setError("Usuario no autenticado.");
        setLoading(false);
        return;
      }

      // 2) Query the `ai_profiles` table
      const { data, error: dbErr } = await supabase
        .from("ai_profiles")
        .select("perfil_ai")
        .eq("supabase_uid", user.id)
        .single();

      if (dbErr) {
        console.error("Error fetching profile:", dbErr);
        setError("No se encontró el perfil.");
      } else {
        // Assume `perfil_ai` is a text column with the summary
        setSummary(data?.perfil_ai || "Sin resumen aún.");
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Perfil generado por IA</h2>
      {loading ? (
        <p>Cargando perfil…</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p className="whitespace-pre-wrap">{summary}</p>
      )}
    </div>
  );
};

export default AIProfile;
