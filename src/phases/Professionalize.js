import React from 'react';
import '../styles/phase.css';

const Professionalize = () => {
  // Inlined data for the Professionalize phase
  const careerPaths = [
    'Machine Learning Engineer',
    'Security Consultant'
  ];

  const resources = [
    'Advanced AI/ML Nanodegree',
    'Cybersecurity Certification Path'
  ];

  return (
    <section className="phase">
      <h1>Professionalize Phase</h1>
      
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

export default Professionalize;
