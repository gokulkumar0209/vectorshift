import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store"; 
import { shallow } from "zustand/shallow"; 
import "reactflow/dist/style.css"; 
import { CreateNode } from "./nodes/CreateNode";
import { nodeConfigs } from "./nodes/nodeConfigs";
import { TextNode } from "./nodes/TextNode";

// Initialize nodes
const InputNode = CreateNode(nodeConfigs.inputNode);
const OutputNode = CreateNode(nodeConfigs.outputNode);
const LLMNode = CreateNode(nodeConfigs.llmNode);
const Temp1 = CreateNode(nodeConfigs.temp1);
const Temp2 = CreateNode(nodeConfigs.temp2);
const Temp3 = CreateNode(nodeConfigs.temp3);
const Temp4 = CreateNode(nodeConfigs.temp4);
const Temp5 = CreateNode(nodeConfigs.temp5);
const Temp6= CreateNode(nodeConfigs.temp6)


const proOptions = { hideAttribution: true }; 
const nodeTypes = {
	customInput: InputNode,
	llm: LLMNode,
	customOutput: OutputNode,
	text: TextNode,
	temp1: Temp1,
	temp2: Temp2,
	temp3: Temp3,
	temp4: Temp4,
	temp5: Temp5,
  temp6: Temp6,
}; // Define node types


const selector = (state) => ({
	nodes: state.nodes,
	edges: state.edges,
	getNodeID: state.getNodeID,
	addNode: state.addNode,
	onNodesChange: state.onNodesChange,
	onEdgesChange: state.onEdgesChange,
	onConnect: state.onConnect,
	removeEdge: state.removeEdge,
});

export const PipelineUI = () => {
	const reactFlowWrapper = useRef(null); 
	const [reactFlowInstance, setReactFlowInstance] = useState(null); 
	const {
		nodes,
		edges,
		getNodeID,
		addNode,
		onNodesChange,
		onEdgesChange,
		onConnect,
		removeEdge,
	} = useStore(selector, shallow); 

	const getInitNodeData = (nodeID, type) => ({ id: nodeID, nodeType: type });

	const getNodePosition = (event, reactFlowBounds, reactFlowInstance) => ({
		x: event.clientX - reactFlowBounds.left,
		y: event.clientY - reactFlowBounds.top,
	});

	const createNewNode = (type, nodeID, position) => ({
		id: nodeID,
		type,
		position,
		data: getInitNodeData(nodeID, type),
	});

	const onDrop = useCallback(
		(event) => {
			event.preventDefault();
			const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect(); // Get flow bounds
			const appData = JSON.parse(
				event.dataTransfer.getData("application/reactflow") || "{}"
			);
			const type = appData?.nodeType;

			if (!type) return; 

			const position = getNodePosition(
				event,
				reactFlowBounds,
				reactFlowInstance
			); 
			const nodeID = getNodeID(type); 
			const newNode = createNewNode(type, nodeID, position); 

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
				
				
				connectionLineType="smoothstep" 
			>
				<Background  />
				<Controls />
				<MiniMap /> 
			</ReactFlow>
		</div>
	);
};
