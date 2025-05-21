import React from 'react';
import '../styles/phase.css';

const Start = () => {
  // Inlined data for the Start phase
  const careerPaths = [
    'IT Support Specialist',
    'Junior Web Developer',
    'QA Tester'
  ];

  const resources = [
    'Orientation Guide',
    'Basic Coding Workshop',
    'Peer Mentorship Program'
  ];

  return (
    <section className="phase">
      <h1>Start Phase</h1>
      
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

export default Start;
