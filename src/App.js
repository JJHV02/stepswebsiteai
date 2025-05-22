// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import Layout from "./Components/Layout";

// Phases
import Start from "./phases/Start";
import Transform from "./phases/Transform";
import Excel from "./phases/Excel";
import Professionalize from "./phases/Professionalize";
import Success from "./phases/Success";

// Components
import ProfileRecommendations from "./Components/profileRecommendations";
import AIProfile from "./Components/AIProfile";
import PrivateRoute from "./Components/PrivateRoute";
import Login from "./Components/Login";
import CompleteProfile from "./Components/CompleteProfile"; // Importa aquí

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/transform" element={<Transform />} />
          <Route path="/excel" element={<Excel />} />
          <Route path="/professionalize" element={<Professionalize />} />
          <Route path="/success" element={<Success />} />
          <Route path="/perfilamiento-inteligente-firestore" element={<ProfileRecommendations />} />
          <Route
            path="/ai-profile"
            element={
              <PrivateRoute>
                <AIProfile />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />

          {/* Ruta para completar perfil */}
          <Route
            path="/complete-profile"
            element={
              <PrivateRoute>
                <CompleteProfile />
              </PrivateRoute  >
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;