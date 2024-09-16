import React from "react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow"; // For efficient state comparison

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

export const SubmitButton = () => {
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
	const handleSubmit = async () => {
		try {
			// Convert nodes and edges to JSON
			const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ nodes, edges }),
			});

			const result = await response.json();
			const { num_nodes, num_edges, is_dag } = result;

			// Display the result in an alert
			alert(
				`Number of Nodes: ${num_nodes}\nNumber of Edges: ${num_edges}\nIs DAG: ${is_dag}`
			);
		} catch (error) {
			console.error("Error submitting pipeline:", error);
			alert("An error occurred while submitting the pipeline.");
		}
	};

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<button type="button" onClick={handleSubmit}>
				Submit
			</button>
		</div>
	);
};
