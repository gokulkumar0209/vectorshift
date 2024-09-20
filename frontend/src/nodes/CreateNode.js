// createNode.js

import BaseNode from "./BaseNode";

export const CreateNode = (config) => {
	return (props) => {
		return <BaseNode {...props} {...config} />;
	};
};
