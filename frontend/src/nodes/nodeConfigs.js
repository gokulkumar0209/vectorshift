import { Position } from "reactflow";

export const nodeConfigs = {
	inputNode: {
		label: "Input Node",
		className: "bg-green-200 w-48 h-56 rounded-lg shadow-lg",
		inputs: [
			{ type: "text", key: "Input Name", placeholder: "Enter name" },
			{ type: "select", key: "Input Type", options: ["Text", "File"] },
		],
		handles: [
			{
				type: "source",
				position: Position.Right,
				idSuffix: "value",
				style: { backgroundColor: "green" },
			},
		],
	},
	outputNode: {
		label: "Output Node",
		className: "bg-blue-200 w-48 h-56 rounded-lg shadow-lg",
		inputs: [
			{ type: "text", key: "Output Name", placeholder: "Enter output name" },
			{ type: "select", key: "Output Type", options: ["Text", "Image"] },
		],
		handles: [
			{
				type: "target",
				position: Position.Left,
				idSuffix: "value",
				style: { backgroundColor: "blue" },
			},
		],
	},

	llmNode: {
		label: "LLM",
		data: { title: "This is LLM" },
		className: "bg-yellow-200 w-48 h-28 rounded-lg shadow-lg",
		inputs: [],
		handles: [
			{
				type: "target",
				position: Position.Left,
				idSuffix: "input1",
				style: { top: "33%" },
			},
			{
				type: "target",
				position: Position.Left,
				idSuffix: "input2",
				style: { top: "66%" },
			},
			{
				type: "source",
				position: Position.Right,
				idSuffix: "output1",
				style: { top: "50%" },
			},
		],
	},
};
