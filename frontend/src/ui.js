import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";  // Zustand store for state management
import { shallow } from "zustand/shallow"; // For efficient state comparison
import "reactflow/dist/style.css";  // Import React Flow CSS
import { CreateNode } from "./nodes/CreateNode";
import { nodeConfigs } from "./nodes/nodeConfigs";
import { TextNode } from "./nodes/TextNode";
import CustomEdge from "./CustomEdge";

// Initialize nodes
const InputNode = CreateNode(nodeConfigs.inputNode);
const OutputNode = CreateNode(nodeConfigs.outputNode);
const LLMNode = CreateNode(nodeConfigs.llmNode);

const gridSize = 20;  // Grid size for snap
const proOptions = { hideAttribution: true };  // Hide ReactFlow attribution
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
};  // Define node types
const edgeTypes = {
  customEdge: CustomEdge,
};  // Define custom edge types

// Zustand selector to get state and functions from the store
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
  const reactFlowWrapper = useRef(null);  // Ref to store React Flow instance
  const [reactFlowInstance, setReactFlowInstance] = useState(null);  // State for React Flow instance
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    removeEdge,
  } = useStore(selector, shallow);  // Zustand store functions and state

  // Helper function to initialize node data
  const getInitNodeData = (nodeID, type) => ({ id: nodeID, nodeType: type });

  // Get node position for drop event
  const getNodePosition = (event, reactFlowBounds, reactFlowInstance) => ({
    x: event.clientX - reactFlowBounds.left,
    y: event.clientY - reactFlowBounds.top,
  });

  // Create a new node object
  const createNewNode = (type, nodeID, position) => ({
    id: nodeID,
    type,
    position,
    data: getInitNodeData(nodeID, type),
  });

  // Handle node drop event
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();  // Get flow bounds
      const appData = JSON.parse(event.dataTransfer.getData("application/reactflow") || "{}");
      const type = appData?.nodeType;

      if (!type) return;  // If node type doesn't exist, return

      const position = getNodePosition(event, reactFlowBounds, reactFlowInstance);  // Get node position
      const nodeID = getNodeID(type);  // Get a unique node ID
      const newNode = createNewNode(type, nodeID, position);  // Create new node

      addNode(newNode);  // Add node to the state
    },
    [getNodeID, addNode, reactFlowInstance]  // Dependencies
  );

  // Handle drag over event
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";  // Set drop effect to move
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ width: "100vw", height: "70vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}  // Handle node changes
        onEdgesChange={onEdgesChange}  // Handle edge changes
        onConnect={onConnect}  // Handle new connection
        onDrop={onDrop}  // Handle drop
        onDragOver={onDragOver}  // Handle drag over
        onInit={setReactFlowInstance}  // Set instance of React Flow
        nodeTypes={nodeTypes}  // Register custom node types
        proOptions={proOptions}  // Hide attribution
        snapGrid={[gridSize, gridSize]}  // Set grid size for snapping
        edgeTypes={edgeTypes}  // Register custom edge types
        connectionLineType="smoothstep"  // Define connection line type
      >
        <Background color="#aaa" gap={gridSize} />  {/* Render background grid */}
        <Controls />  {/* Render controls for zoom and pan */}
        <MiniMap />  {/* Render mini map for navigation */}
      </ReactFlow>
    </div>
  );
};
