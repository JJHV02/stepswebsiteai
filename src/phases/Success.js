import React from 'react';
import '../styles/phase.css';

const Success = () => {
  // Inlined data for the Success phase
  const careerPaths = [
    'Technical Lead',
    'CTO'
  ];

  const resources = [
    'Leadership Development Program',
    'Innovation Management Workshop'
  ];

  return (
    <section className="phase">
      <h1>Success Phase</h1>
      
      <div className="phase-section">
        <h2>Career Paths</h2>
        <ul>
          {careerPaths.map((path, i) => (
            <li key={i}>{path}</li>
          ))}
        </ul>
      </div>

      <div className="phase-section">
        <h2>Resources</h2>
        <ul>
          {resources.map((res, i) => (
            <li key={i}>{res}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Success;
