import React from 'react';
import '../styles/phase.css';

const Transform = () => {
  // Inlined data for the Transform phase
  const careerPaths = [
    'Full-Stack Developer Intern',
    'Data Analyst Trainee'
  ];

  const resources = [
    'Interdisciplinary Project Challenges',
    'Summer Internship Program'
  ];

  return (
    <section className="phase">
      <h1>Transform Phase</h1>
      
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

export default Transform;



