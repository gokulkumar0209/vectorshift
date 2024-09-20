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

	temp1: {
		label: "Temp 1",
		className: "bg-indigo-200 w-48 h-56 rounded-lg shadow-lg",
		inputs: [
			{ type: "text", key: "Input Name", placeholder: "Enter name" },
			{ type: "select", key: "Input Type", options: ["Text", "File"] },
		],
		handles: [
			{
				type: "source",
				position: Position.Right,
				idSuffix: "value",
			
			},
			{
				type: "target",
				position: Position.Left,
				idSuffix: "value",
			
			},
		],
	},

	temp2: {
		label: "Temp 2",
		className: "bg-cyan-200 w-48 h-56 rounded-lg shadow-lg",
		inputs: [
			{ type: "text", key: "Input Name", placeholder: "Enter name" },
			{ type: "select", key: "Input Type", options: ["Text", "File"] },
		],
		handles: [
			{
				type: "target",
				position: Position.Left,
				idSuffix: "value",
				style:{top:"33%"}
			},
			{
				type: "target",
				position: Position.Left,
				idSuffix: "value",
				style:{top:"66%"}
			},
			{
				type: "source",
				position: Position.Right,
				idSuffix: "value",
				style:{top:"50%"}
			},
		],
	},

	temp3: {
		label: "Temp 3",
		className: "bg-teal-200 w-48 h-56 rounded-lg shadow-lg",
		inputs: [
			{ type: "text", key: "Input Name", placeholder: "Enter name" },
			{ type: "select", key: "Input Type", options: ["Text", "File"] },
		],
		handles: [
			{
				type: "source",
				position: Position.Right,
				idSuffix: "value",
				
			},
			{
				type: "target",
				position: Position.Left,
				idSuffix: "value",
				style:{top:"50%"}
			},
		],
	},

	temp4: {
		label: "Temp 4",
		className: "bg-lime-200 w-48 h-56 rounded-lg shadow-lg",
		inputs: [
			{ type: "text", key: "Input Name", placeholder: "Enter name" },
			{ type: "select", key: "Input Type", options: ["Text", "File"] },
		],
		handles: [
			{
				type: "source",
				position: Position.Right,
				idSuffix: "value",
				style:{top:"33%"}
			},
			{
				type: "source",
				position: Position.Right,
				idSuffix: "value",
				style:{top:"66%"}
			},
			{
				type: "target",
				position: Position.Left,
				idSuffix: "value",
				style:{top:"50%"}
			},
		],
	},

	temp5: {
		label: "Temp 5",
		className: "bg-stone-200 w-48 h-56 rounded-lg shadow-lg",
		inputs: [
			{ type: "text", key: "Input Name", placeholder: "Enter name" },
			{ type: "select", key: "Input Type", options: ["Text", "File"] },
		],
		handles: [
			{
				type: "source",
				position: Position.Right,
				idSuffix: "value",
				style:{top:"25%"}
			},
			{
				type: "source",
				position: Position.Right,
				idSuffix: "value",
				style:{top:"50%"}
			},
			{
				type: "source",
				position: Position.Right,
				idSuffix: "value",
				style:{top:"75%"}
			},
		],
	},
	temp6: {
		label: "Temp 6",
		className: "bg-teal-200 w-48 h-56 rounded-lg shadow-lg",
		inputs: [
			{ type: "text", key: "Input Name", placeholder: "Enter name" },
			{ type: "select", key: "Input Type", options: ["Text", "File"] },
		],
		handles: [
			{
				type: "source",
				position: Position.Right,
				idSuffix: "value",
				
			},
			{
				type: "target",
				position: Position.Left,
				idSuffix: "value",
				style:{top:"50%"}
			},
		],
	},
};
