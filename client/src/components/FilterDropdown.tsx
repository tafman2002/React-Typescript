import React, { useState } from "react";
import "./FilterDropdown.scss";

interface Props {
    options: Array<{ value: string; label: string }>;
    onChange: (value: string) => void;
}

const FilterDropdown: React.FC<Props> = ({ options, onChange }) => {
    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
        onChange(event.target.value);
    };

    return (
        <select value={selectedValue} onChange={handleChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default FilterDropdown;
