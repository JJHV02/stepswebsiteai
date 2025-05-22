import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AIProfile = () => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user }, error: authErr } = await supabase.auth.getUser();
      if (authErr || !user) {
        setError("Usuario no autenticado.");
        setLoading(false);
        return;
      }

      const { data, error: dbErr } = await supabase
        .from("ai_profiles")
        .select("perfil_ai")
        .eq("supabase_uid", user.id)
        .single();

      if (dbErr) {
        setError("No se encontró el perfil.");
      } else {
        setSummary(
          typeof data.perfil_ai === "object"
            ? JSON.stringify(data.perfil_ai, null, 2)
            : data.perfil_ai || "Sin resumen aún."
        );
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
        <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded">{summary}</pre>
      )}
    </div>
  );
};

export default AIProfile;