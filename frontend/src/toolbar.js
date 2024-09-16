import { DraggableNode } from "./draggableNode";

const toolbarStyle = {
	padding: "10px",
};

const contentStyle = {
	marginTop: "20px",
	display: "flex",
	flexWrap: "wrap",
	gap: "10px",
};

export const PipelineToolbar = () => {
	return (
		<div style={toolbarStyle}>
			<div style={contentStyle}>
				<DraggableNode type="customInput" label="Input" />
				<DraggableNode type="llm" label="LLM" />
				<DraggableNode type="customOutput" label="Output" />
				<DraggableNode type="text" label="Text" />
				<DraggableNode type="temp1" label="Temp 1" />
				<DraggableNode type="temp2" label="Temp 2" />
				<DraggableNode type="temp3" label="Temp 3" />
				<DraggableNode type="temp4" label="Temp 4" />
				<DraggableNode type="temp5" label="Temp 5" />
			</div>
		</div>
	);
};
