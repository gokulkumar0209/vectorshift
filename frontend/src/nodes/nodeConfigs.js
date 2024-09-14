import { Position } from "reactflow";

export const nodeConfigs = {
	inputNode: {
		label: "Input Node",
		inputs: [
			{ type: "text", key: "inputName", placeholder: "Enter name" },
			{ type: "select", key: "inputType", options: ["Text", "File"] },
		],
		handles: [
			{
				type: "source",
				position: Position.Right,
				idSuffix: "value",
				style: {},
			},
			{ type: "source", position: Position.Left, idSuffix: "value", style: {} },
		],
	},
	outputNode: {
		label: "Output Node",
		inputs: [
			{ type: "text", key: "outputName", placeholder: "Enter output name" },
			{ type: "select", key: "outputType", options: ["Text", "Image"] },
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
