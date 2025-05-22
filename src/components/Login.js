import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let result;
      if (isNewUser) {
        result = await supabase.auth.signUp({ email, password });
        if (result.error) throw result.error;
        setLoading(false);
        return;
      }

      result = await supabase.auth.signInWithPassword({ email, password });
      if (result.error) throw result.error;

      const user = result.data.user;

      // Verificar si el perfil existe
      const { data: profile, error: profileError } = await supabase
        .from("ai_profiles")
        .select("id")
        .eq("supabase_uid", user.id)
        .single();

      if (profileError || !profile) {
        // No existe perfil, ir a completar perfil
        navigate("/complete-profile");
      } else {
        // Perfil existe, ir a AI Profile
        navigate("/ai-profile");
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">{isNewUser ? "Registrar usuario" : "Iniciar sesión"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? (isNewUser ? "Registrando…" : "Entrando…") : (isNewUser ? "Registrar" : "Entrar")}
        </button>
      </form>
      <p
        className="mt-4 text-sm text-blue-600 hover:underline cursor-pointer"
        onClick={() => {
          setIsNewUser(!isNewUser);
          setError("");
        }}
      >
        {isNewUser ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
      </p>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}