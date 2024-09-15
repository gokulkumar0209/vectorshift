import { Handle, Position } from "reactflow";
import { useState } from "react";

const BaseNode = ({ id, data, label, inputs, handles, className }) => {
	const [currName, setCurrName] = useState("");

	const handleChange = (e) => {
		setCurrName(e.target.value);
	};

	return (
		<div
			className={`${className}  rounded-lg shadow-lg p-4 `}
		>
			<div className="font-bold text-center mb-2 flex justify-between items-center">
				<span>{label}</span>
				<h3
					className="text-red-600 cursor-pointer"
					onClick={() => console.log("Close button clicked")}
				>
					x
				</h3>
			</div>
			{data?.title && (
				<div className="text-sm text-gray-600 mb-4 text-center">
					{data.title}
				</div>
			)}
			<div className="space-y-2">
				{inputs.map(({ type, key, placeholder, options }) => (
					<label key={key} className="block">
						<span className="text-sm font-medium">{key}:</span>
						{type === "text" ? (
							<input
								type="text"
								value={currName}
								placeholder={placeholder}
								onChange={handleChange}
								className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
							/>
						) : (
							<select
								// Uncomment and update value and onChange as needed
								// value={formData[key] || ""}
								// onChange={(e) => handleChange(e, key)}
								className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
							>
								{options.map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</select>
						)}
					</label>
				))}
			</div>

			{handles.map(({ type, position, idSuffix, style }) => (
				<div key={`${id}-${idSuffix}`} className="">
					{position === Position.Left ? (
						<>
							<Handle
								type={type}
								position={Position.Left}
								id={`${id}-${idSuffix}`}
								style={{ backgroundColor: "green", ...style }}
							>
								<span className=" absolute right-0 mr-2 ">{currName}</span>
							</Handle>
						</>
					) : (
						<>
							<Handle
							
								type={type}
								position={Position.Right}
								id={`${id}-${idSuffix}`}
								style={{ backgroundColor: "blue", ...style }}
							>
								<span className=" absolute left-0 ml-2">{currName} </span>
							</Handle>
						</>
					)}
				</div>
			))}
		</div>
	);
};

export default BaseNode;
