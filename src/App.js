// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// Layout
import Layout from './Components/Layout';

// Phases
import Start from './phases/Start';
import Transform from './phases/Transform';
import Excel from './phases/Excel';
import Professionalize from './phases/Professionalize';
import Success from './phases/Success';

// Components
import ProfileRecommendations from './Components/profileRecommendations';
import AIProfile from './AIProfile';
import PrivateRoute from './Components/PrivateRoute';
import Login from './Components/Login';

function App() {
  return (
    <Router>
      <Layout>
        


        {/* Route definitions */}
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/transform" element={<Transform />} />
          <Route path="/excel" element={<Excel />} />
          <Route path="/professionalize" element={<Professionalize />} />
          <Route path="/success" element={<Success />} />
          <Route path="/perfilamiento-inteligente-firestore" element={<ProfileRecommendations />} /> 
          <Route path="/ai-profile" element={
            <PrivateRoute>
              <AIProfile />
            </PrivateRoute>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

