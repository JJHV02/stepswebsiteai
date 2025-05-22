import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";


const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validateEmail(email)) {
      setError("Correo electrónico inválido.");
      setLoading(false);
      return;
    }

    try {
      let result;
      if (isNewUser) {
        result = await supabase.auth.signUp({ email, password });
        if (result.error) throw result.error;
        alert("✅ Registro exitoso. Verifica tu correo.");
      } else {
        result = await supabase.auth.signInWithPassword({ email, password });
        if (result.error) throw result.error;
        console.log("✅ Login exitoso:", result.data.user);
        navigate("/ai-profile");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      setError(err.message || "Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">
        {isNewUser ? "Registrar Usuario" : "Iniciar Sesión"}
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
              ? "Registrando..."
              : "Entrando..."
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

export default AuthForm;