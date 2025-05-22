import React, { useState, useEffect } from "react";
import { supabase }    from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const [userId, setUserId] = useState(null);
  const [form, setForm]     = useState({
    nombre: "",
    carrera: "",
    certificados: "",
    grupos: "",
    proyectos: "",
    pais: "",
    studyAbroad: false,
    universidad: "",
    studyArea: "",
    yearGraduated: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser()
      .then(({ data: { user }, error }) => {
        if (error || !user) setError("Usuario no autenticado.");
        else setUserId(user.id);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      if (!userId) throw new Error("Usuario no autenticado.");

      const { error: upError } = await supabase.from("ai_profiles").insert([{
        supabase_uid:   userId,
        nombre:         form.nombre,
        carrera:        form.carrera,
        certificados:   form.certificados ? form.certificados.split(",").map(s => s.trim()) : [],
        grupos:         form.grupos ? form.grupos.split(",").map(s => s.trim()) : [],
        proyectos:      form.proyectos ? form.proyectos.split(",").map(s => s.trim()) : [],
        pais:           form.pais,
        study_abroad:   form.studyAbroad,
        universidad:    form.universidad,
        study_area:     form.studyArea,
        year_graduated: form.yearGraduated ? parseInt(form.yearGraduated) : null,
        perfil_ai:      {}
      }]);

      if (upError) throw upError;
      navigate("/ai-profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (userId === null) {
    return <p>Cargando datos de usuario…</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Completa tu perfil</h2>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nombre" placeholder="Nombre"
          value={form.nombre} onChange={handleChange}
          required className="w-full p-2 border rounded"
        />
        <input
          name="carrera" placeholder="Carrera"
          value={form.carrera} onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="certificados"
          placeholder="Certificados (coma separada)"
          value={form.certificados}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="grupos"
          placeholder="Grupos/Clubes (coma separada)"
          value={form.grupos}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="proyectos"
          placeholder="Proyectos (coma separada)"
          value={form.proyectos}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="pais" placeholder="País"
          value={form.pais} onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <label className="inline-flex items-center space-x-2">
          <input
            name="studyAbroad" type="checkbox"
            checked={form.studyAbroad}
            onChange={handleChange}
          />
          <span>Estudio en el extranjero</span>
        </label>
        <input
          name="universidad" placeholder="Universidad"
          value={form.universidad} onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="studyArea" placeholder="Área de estudio"
          value={form.studyArea} onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="yearGraduated" type="number"
          placeholder="Año de graduación"
          value={form.yearGraduated}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          min="1900" max={new Date().getFullYear() + 10}
        />
        <button
          type="submit" disabled={loading}
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Guardando…" : "Guardar perfil"}
        </button>
      </form>
    </div>
  );
};

export default CompleteProfile;