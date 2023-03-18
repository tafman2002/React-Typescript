import React, { useState } from "react";
import "./SearchAndFilter.scss";
import FilterDropdown from "./FilterDropdown";

interface Props {}
const options = [
    { value: "priority", label: "Priority" },
    { value: "dueDate", label: "Due Date" },
    { value: "status", label: "Status" },
];
const SearchAndFilter: React.FC<Props> = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterTerm, setFilterTerm] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleFilter = (value: string) => {
        setFilterTerm(value);
    };

    return (
        <div className="search-and-filter">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <FilterDropdown options={options} onChange={handleFilter} />
        </div>
    );
};

export default SearchAndFilter;
