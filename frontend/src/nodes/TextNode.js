import React, { useState, useEffect } from "react";
import { Handle, Position } from "reactflow";

export const TextNode = ({ id, data }) => {
	const [currText, setCurrText] = useState(data?.text || `{{input}}`);
	const [width, setWidth] = useState(200);
	const [height, setHeight] = useState(50);
	const [variableHandles, setVariableHandles] = useState([]);

	const variableRegex = /\{\{\s*(\w+)\s*\}\}/g;

	useEffect(() => {
		const newWidth = Math.min(400, 200 + currText.length * 5);
		setWidth(newWidth);
		const newHeight = Math.min(400, Math.max(variableHandles.length * 20,50));
    
		setHeight(newHeight);

		const variables = [...currText.matchAll(variableRegex)].map((match) => match[1]);
		setVariableHandles(variables);
	}, [currText]);

	const handleTextChange = (e) => {
		setCurrText(e.target.value);
	};

	return (
		<div className="bg-gray-100 rounded-lg shadow-lg p-4 border border-gray-300" style={{ width: width + 20, height: height + 80 }}>
			<div className="font-bold text-center mb-2 flex justify-between items-center">
				<span className="text-gray-700">TextNode</span>
				<button className="text-red-600 text-lg" onClick={() => console.log('Remove clicked')}>x</button>
			</div>
			<div className="text-sm text-gray-600 mb-4">
				<label>
					Text:
					<textarea
						value={currText}
						onChange={handleTextChange}
						className="w-full h-full border border-gray-300 p-2 mt-1 bg-gray-50 rounded-md resize-none"
						style={{ width, height }}
					/>
				</label>
			</div>
			<Handle type="source" position={Position.Right} id={`${id}-output`} className="bg-green-500" />
			{variableHandles.map((variable, index) => (
				<Handle
					key={`${id}-${variable}`}
					type="target"
					position={Position.Left}
					id={`${id}-${variable}`}
					style={{ top: `${(index+1) * 20}px`, backgroundColor: "blue" }}
				>
					<span className="absolute right-0 mr-2 text-white">{variable}</span>
				</Handle>
			))}
		</div>
	);
};
