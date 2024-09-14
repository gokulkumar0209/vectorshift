import { Handle } from "reactflow";
import { useState } from "react";

const BaseNode = ({ id, data, label, inputs, handles }) => {
	const [formData, setFormData] = useState(data || {});

	const handleChange = (e, inputKey) => {
		const value = e.target.value;
		setFormData((prev) => ({
			...prev,
			[inputKey]: value,
		}));
	};

	return (
		<div
			style={{
				width: 200,
				height: 100,
				border: "1px solid black",
				padding: 10,
			}}
		>
			<div>
				<span>{label}</span>
			</div>
			{formData ? <div>{data.title}</div> : null}
			<div>
				{inputs.map(({ type, key, placeholder, options }) => (
					<label key={key}>
						{key}:
						{type === "text" ? (
							<input
								type="text"
								value={formData[key] || ""}
								placeholder={placeholder}
								onChange={(e) => handleChange(e, key)}
							/>
						) : (
							<select
								value={formData[key] || ""}
								onChange={(e) => handleChange(e, key)}
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
				<Handle
					key={`${id}-${idSuffix}`}
					type={type}
					position={position}
					id={`${id}-${idSuffix}`}
					style={style}
				/>
			))}
		</div>
	);
};

export default BaseNode;
