import React, { useState } from 'react';

// App component
function App() {
  const [jsonResult, setJsonResult] = useState(null);
  const [totalIssues, setTotalIssues] = useState(0); // State to track total number of issues

  // Function to handle the file upload and conversion
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if(file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const textContent = e.target.result;
        const keyValueOutput = convertTextToKeyValue(textContent);
        setJsonResult(keyValueOutput);
        setTotalIssues(Object.keys(keyValueOutput).length); // Update total number of credit issues
      };
      reader.readAsText(file);
    }
  };

  // Function to convert text file content to key-value pairs
  const convertTextToKeyValue = (text) => {
    const lines = text.split('\n');
    const creditIssues = {};
    let currentName = '';
    let currentDescription = '';
    let isDescription = false;

    lines.forEach((line) => {
      line = line.trim(); // Trim whitespace from the line

      // Check if it's a Name line (doesn't start with 'Description:' and contains a colon)
      if(line.includes(':') && !line.startsWith('Description')) {
        // If we have both a Name and Description, push to the object as key-value pair
        if(currentName && currentDescription) {
          creditIssues[currentName.trim()] = currentDescription.trim(); // Save key-value pair
          currentDescription = ''; // Reset description for next entry
        }

        // Handle complex cases like "Low Doc - Accountants Declaration: - Description:"
        if(line.toLowerCase().includes('description')) {
          const split = line.split('Description:');
          currentName = split[0].replace(':', '').trim(); // Set the name
          currentDescription = split[1].trim(); // Set the description (if it exists on the same line)
          isDescription = true;
        } else {
          currentName = line.replace(':', '').trim(); // Set name for normal cases
          isDescription = false;
        }
      } else if(line.startsWith('Description:')) {
        // If line starts with 'Description:', set description
        currentDescription = line.replace('Description:', '').trim();
        isDescription = true;
      } else if(line && isDescription) {
        // If line is part of description (i.e., non-empty and isDescription flag is set), append it
        currentDescription += ' ' + line.trim();
      }
    });

    // Add the last entry to the object if it exists
    if(currentName && currentDescription) {
      creditIssues[currentName.trim()] = currentDescription.trim();
    }

    return creditIssues;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Credit Issues Converter</h1>
      <input type="file" onChange={handleFileUpload} />
      {jsonResult && (
        <div>
          <h3>Statistics</h3>
          <p>Total Credit Issues: {totalIssues}</p> {/* Display total number of issues */}

          <h2>Converted Key-Value Output:</h2>
          <pre>{JSON.stringify(jsonResult, null, 2)}</pre>
          <button
            onClick={() => {
              const element = document.createElement('a');
              const file = new Blob([JSON.stringify(jsonResult, null, 2)], { type: 'application/json' });
              element.href = URL.createObjectURL(file);
              element.download = 'creditIssuesKeyValue_Updated.json';
              document.body.appendChild(element); // Required for this to work in FireFox
              element.click();
            }}
          >
            Download JSON
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
