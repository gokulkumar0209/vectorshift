import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || `{{input}}`);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(80);
  const [variableHandles, setVariableHandles] = useState([]);

  // Regular expression to detect variables inside {{ }}
  const variableRegex = /\{\{\s*(\w+)\s*\}\}/g;

  // Function to handle text input change and dynamic resizing
  const handleTextChange = (e) => {
    const value = e.target.value;
    setCurrText(value);

    // Dynamically adjust width and height based on text length and line breaks
    const newWidth = Math.min(400, 200 + value.length * 5); // Width grows with text length
    const newHeight = Math.min(300, 80 + value.split('\n').length * 20); // Height adjusts with line breaks
    setWidth(newWidth);
    setHeight(newHeight);

    // Find variables within the text (e.g., {{input}})
    const variables = [...value.matchAll(variableRegex)].map((match) => match[1]);
    setVariableHandles(variables);
  };

  return (
    <div style={{ width: width, height: height, border: '1px solid black', padding: '10px' }}>
      <div>
        <span>Text</span>
      </div>
      <div>
        <label>
          Text:
          <input
            type="text"
            value={currText}
            onChange={handleTextChange}
            style={{ width: '100%', height: 'auto', border: '1px solid gray', padding: '5px' }}
          />
        </label>
      </div>
      {/* Default Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />

      {/* Dynamic Variable Handles for each {{variable}} found */}
      {variableHandles.map((variable, index) => (
        <Handle
          key={`${id}-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{ top: `${(index + 1) * 20}px` }} // Adjust position based on index
        />
      ))}
    </div>
  );
}
