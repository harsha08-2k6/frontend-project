import React, { useState } from 'react';
import '../../styles/StudentComponents.css';

const VirtualLab = () => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('# Write your code here\n\n');
  const [output, setOutput] = useState('');

  const handleRun = () => {
    // In a real application, this would send the code to a backend service
    // For demo purposes, we'll simulate output
    setOutput(`Running ${language} code...\n\n${getSimulatedOutput(language, code)}`);
  };

  const getSimulatedOutput = (lang, code) => {
    if (lang === 'python' && code.includes('print')) {
      return 'Output: ' + code.split('print(')[1].split(')')[0].replace(/['"]/g, '');
    } else if (lang === 'c' && code.includes('printf')) {
      return 'Output: ' + code.split('printf(')[1].split(')')[0].replace(/['"]/g, '');
    } else {
      return 'No output or syntax error detected. Please check your code.';
    }
  };

  return (
    <div className="virtual-lab-container">
      <div className="section-header">
        <h2>Virtual Lab</h2>
      </div>
      
      <div className="ide-container">
        <div className="ide-header">
          <select 
            className="language-selector"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="python">Python</option>
            <option value="c">C</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>
        
        <div className="ide-body">
          <textarea
            className="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your code here..."
          ></textarea>
          
          <div className="output-panel">
            <pre>{output}</pre>
          </div>
        </div>
        
        <div className="ide-footer">
          <button className="run-btn" onClick={handleRun}>
            Run Code
          </button>
        </div>
      </div>
      
      <div className="ide-info">
        <h3>About Virtual Lab</h3>
        <p>
          This is a simplified code editor for educational purposes. In a production environment, 
          this would connect to a backend service that executes code in a secure sandbox.
        </p>
        <p>
          For this demo, you can write simple code and see simulated output. Try writing a 
          print statement in Python or a printf statement in C.
        </p>
      </div>
    </div>
  );
};

export default VirtualLab;