import { create } from "zustand";
import {
	addEdge,
	applyNodeChanges,
	applyEdgeChanges,
	MarkerType,
	getConnectedEdges,
} from "reactflow";

export const useStore = create((set, get) => ({
	nodes: [],
	edges: [],
	nodeIDs: {},
	getNodeID: (type) => {
		const newIDs = { ...get().nodeIDs };
		if (newIDs[type] === undefined) {
			newIDs[type] = 0;
		}
		newIDs[type] += 1;
		set({ nodeIDs: newIDs });
		return `${type}-${newIDs[type]}`;
	},
	addNode: (node) => {
		set({
			nodes: [...get().nodes, node],
		});
	},
	onNodesChange: (changes) => {
		set({
			nodes: applyNodeChanges(changes, get().nodes),
		});
	},
	onEdgesChange: (changes) => {
		set({
			edges: applyEdgeChanges(changes, get().edges),
		});
	},
	onConnect: (connection) => {
		set({
			edges: addEdge(
				{
					...connection,
					type: "custom",
					animated: true,
					markerEnd: { type: MarkerType.Arrow, height: "20px", width: "20px" },
				},
				get().edges
			),
		});
	},
	removeEdge: (edgeId) => {
		set({
			edges: get().edges.filter((edge) => edge.id !== edgeId),
		});
	},
	updateNodeField: (nodeId, fieldName, fieldValue) => {
		set({
			nodes: get().nodes.map((node) => {
				if (node.id === nodeId) {
					node.data = { ...node.data, [fieldName]: fieldValue };
				}
				return node;
			}),
		});
	},
	onNodesDelete: (idToDelete) => {
		const { nodes, edges } = get();

		
		const remainingNodes = nodes.filter((node) => node.id !== idToDelete);

		
		const nodeToDelete = nodes.find((node) => node.id === idToDelete);

		if (!nodeToDelete) return; 

		
		const connectedEdges = getConnectedEdges([nodeToDelete], edges);

		
		const remainingEdges = edges.filter(
			(edge) => !connectedEdges.includes(edge)
		);

		
		set({
			nodes: remainingNodes,
			edges: remainingEdges,
		});
	},
}));
