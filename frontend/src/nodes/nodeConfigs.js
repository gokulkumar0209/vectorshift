import { Background, Position } from "reactflow";

export const nodeConfigs = {
	inputNode: {
		label: "Input Node",
		className: " bg-green-200 w-48 h-56",
		inputs: [
			{ type: "text", key: "Input Name", placeholder: "Enter name" },
			{ type: "select", key: "Input Type", options: ["Text", "File"] },
		],
		handles: [
			{
				type: "source",
				position: Position.Right,
				idSuffix: "value",
				style: {},
			},
		],
	},
	outputNode: {
		label: "Output Node",
		className : "w-48 h-56 bg-blue-200",
		inputs: [
			{ type: "text", key: "Output Name", placeholder: "Enter output name" },
			{ type: "select", key: "Output Type", options: ["Text", "Image"] },
		],
		handles: [
			{ type: "target", position: Position.Left, idSuffix: "value", style: {} },
		],
	},
	textNode: {
		label: "Text Node",
		inputs: [{ type: "text", key: "text", placeholder: "Enter text" }],
		handles: [
			{
				type: "source",
				position: Position.Right,
				idSuffix: "output",
				style: {},
			},
		],
	},
	llmNode: {
		label: "LLM",
		data: { title: "This is LLM" },
		className:" w-48 h-28",
		inputs: [],
		handles: [
			{
				type: "target",
				position: Position.Left,
				idSuffix: "input1",
				style: { top: `${100 / 3}%` },
			},
			{
				type: "target",
				position: Position.Left,
				idSuffix: "input2",
				style: { top: `${200 / 3}%` },
			},
			{
				type: "source",
				position: Position.Right,
				idSuffix: "output1",
				style: { top: `${100 / 2}%` },
			},
		],
	},
};
