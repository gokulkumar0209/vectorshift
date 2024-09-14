import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import "reactflow/dist/style.css";
import { CreateNode } from "./nodes/CreateNode";
import { nodeConfigs } from "./nodes/nodeConfigs";

const InputNode = CreateNode(nodeConfigs.inputNode);
const OutputNode = CreateNode(nodeConfigs.outputNode);
const TextNode = CreateNode(nodeConfigs.textNode);
const LLMNode = CreateNode(nodeConfigs.llmNode);

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
	customInput: InputNode,
	llm: LLMNode,
	customOutput: OutputNode,
	text: TextNode,
};

const selector = (state) => ({
	nodes: state.nodes,
	edges: state.edges,
	getNodeID: state.getNodeID,
	addNode: state.addNode,
	onNodesChange: state.onNodesChange,
	onEdgesChange: state.onEdgesChange,
	onConnect: state.onConnect,
});

export const PipelineUI = () => {
	const reactFlowWrapper = useRef(null);
	const [reactFlowInstance, setReactFlowInstance] = useState(null);
	const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);

	const getInitNodeData = (nodeID, type) => {
		return { id: nodeID, nodeType: type };
	};

	const onDrop = useCallback(
		(event) => {
			event.preventDefault();
			const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
			const appData = JSON.parse(event.dataTransfer.getData("application/reactflow") || "{}");
			const type = appData?.nodeType;

			if (!type) return;

			const position = reactFlowInstance.project({
				x: event.clientX - reactFlowBounds.left,
				y: event.clientY - reactFlowBounds.top,
			});

			const nodeID = getNodeID(type);
			const newNode = {
				id: nodeID,
				type,
				position,
				data: getInitNodeData(nodeID, type),
			};

			addNode(newNode);
		},
		[getNodeID, addNode, reactFlowInstance]
	);

	const onDragOver = useCallback((event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	}, []);

	return (
		<div ref={reactFlowWrapper} style={{ width: "100vw", height: "70vh" }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onDrop={onDrop}
				onDragOver={onDragOver}
				onInit={setReactFlowInstance}
				nodeTypes={nodeTypes}
				proOptions={proOptions}
				snapGrid={[gridSize, gridSize]}
				connectionLineType="smoothstep"
			>
				<Background color="#aaa" gap={gridSize} />
				<Controls />
				<MiniMap />
			</ReactFlow>
		</div>
	);
};
