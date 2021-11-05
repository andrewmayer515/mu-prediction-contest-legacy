import React, { useState, useEffect } from 'react';
import './index.css';

const App = () => {
  const [version, updateVersion] = useState('');

  useEffect(() => {
    const fetchSHA = async () => {
      const response = await fetch('/api/example');
      const json = await response.json();
      updateVersion(json.version);
    };

    fetchSHA();
  }, []);

  return (
    <>
      <span>React Template</span>
      <span>{`Version: ${version}`}</span>
    </>
  );
};

export default App;
