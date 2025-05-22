import React, { useEffect, useState } from "react";
import { fetchAndAnalyzeProfiles } from "../services/profileService";
import "../styles/phase.css";

export default function ProfileRecommendations() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null); // Estado para errores

  useEffect(() => {
    (async () => {
      try {
        console.log("📡 llamando a fetchAndAnalyzeProfiles()");
        const results = await fetchAndAnalyzeProfiles();
        setProfiles(results);
      } catch (err) {
        console.error("❌ error al cargar perfiles:", err);
        setError("Hubo un problema al cargar los perfiles. Intenta más tarde.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <section className="phase">
        <h1>Perfilamiento con IA</h1>
        <p>Cargando perfiles…</p>
      </section>
    );
  }

  return (
    <section className="phase">
      <h1>Perfilamiento con IA</h1>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {!error && profiles.length === 0 ? (
        <p>No hay perfiles disponibles.</p>
      ) : (
        profiles.map((p, idx) => (
          <div key={idx} className="profile-card">
            <h2>
              {p.nombre} ({p.yearGraduated})
            </h2>
            <p>
              <strong>Carrera:</strong> {p.career}
            </p>
            <h3>Sugerencias de ruta profesional</h3>
            <ul>
              {p.suggestions.map((s, i) => (
                <li key={i}>
                  <strong>{s.title}:</strong> {s.description}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </section>
  );
}