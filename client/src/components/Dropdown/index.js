import React from "react";
import "./index.css";

function Dropdown({ value, handleChange, options, id, label }) {
  return (
    <div>
      <label htmlFor={id} className="dropdown-label">
        {label}
      </label>

      <select
        id={id}
        value={value}
        onChange={handleChange}
        className="dropdown"
      >
        {options.map((dropdownOption) => {
          return (
            <option key={dropdownOption} value={dropdownOption}>
              {dropdownOption}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Dropdown;
