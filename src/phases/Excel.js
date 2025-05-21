import React from 'react';
import '../styles/phase.css';

const Excel = () => {
  // Inlined data for the Excel phase
  const careerPaths = [
    'Cloud Engineer',
    'DevOps Specialist'
  ];

  const resources = [
    'AWS Certified Cloud Practitioner Course',
    'Open-Source Contribution Guide'
  ];

  return (
    <section className="phase">
      <h1>Excel Phase</h1>
      
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

export default Excel;
