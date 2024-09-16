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
			</div>
		</div>
	);
};
