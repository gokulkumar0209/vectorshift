import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || `{{input}}`);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(80);
  const [variableHandles, setVariableHandles] = useState([]);

  const variableRegex = /\{\{\s*(\w+)\s*\}\}/g;

  const handleTextChange = (e) => {
    const value = e.target.value;
    setCurrText(value);

    const newWidth = Math.min(400, 200 + value.length * 5);
    const newHeight = Math.min(300, 80 + value.split('\n').length * 20);
    setWidth(newWidth);
    setHeight(newHeight);

    const variables = [...value.matchAll(variableRegex)].map((match) => match[1]);
    setVariableHandles(variables);
  };

  return (
    <div style={{ width, height, border: '1px solid black', padding: '10px' }}>
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
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
      {variableHandles.map((variable, index) => (
        <Handle
          key={`${id}-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{ top: `${(index + 1) * 20}px` }}
        />
      ))}
    </div>
  );
};
