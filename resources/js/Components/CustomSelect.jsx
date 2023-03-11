import React, { useState } from "react";

const CustomSelect = ({
    options,
    onChange,
    className = "",
    isRequired = false,
    ...props
}) => {
    const [selectedValue, setSelectedValue] = useState(props.value);

    const handleChange = (e) => {
        setSelectedValue(e.target.value);

        onChange(e.target.value);
    };

    return (
        <div>
            <select
                {...props}
                value={selectedValue}
                onChange={handleChange}
                className={
                    "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm " +
                    className
                }
                required={isRequired}
            >
                <option key={0} value="">
                    select {props.id}
                </option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CustomSelect;
