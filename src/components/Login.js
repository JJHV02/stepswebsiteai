// src/components/Login.js
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    let res;
    if (isNewUser) {
      // Supabase sign-up
      res = await supabase.auth.signUp({ email, password });
    } else {
      // Supabase sign-in
      res = await supabase.auth.signInWithPassword({ email, password });
    }

    setLoading(false);

    if (res.error) {
      setError(res.error.message);
    } else {
      // On login or on confirmation-link sent for signup:
      navigate("/ai-profile"); 
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">
        {isNewUser ? "Registrar usuario" : "Iniciar sesión"}
      </h2>

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
          {loading
            ? isNewUser
              ? "Registrando…"
              : "Entrando…"
            : isNewUser
            ? "Registrar"
            : "Entrar"}
        </button>
      </form>

      <p
        className="mt-4 text-sm text-blue-600 hover:underline cursor-pointer"
        onClick={() => {
          setIsNewUser(!isNewUser);
          setError("");
        }}
      >
        {isNewUser
          ? "¿Ya tienes cuenta? Inicia sesión"
          : "¿No tienes cuenta? Regístrate"}
      </p>

      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default Login;
