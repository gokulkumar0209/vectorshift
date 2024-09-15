import { Handle } from "reactflow";
import { useState } from "react";

const BaseNode = ({ id, data, label, inputs, handles, className }) => {
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
			className={className+"  "}
			style={{
				width: 200,
				height: 150,
				border: "1px solid black",
			
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
                    className=" text-4xl"
				/>
			))}
		</div>
	);
};

export default BaseNode;
