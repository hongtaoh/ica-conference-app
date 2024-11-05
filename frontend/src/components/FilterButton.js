// components/FilterButton.js
import React from 'react';

const FilterButton = ({ toggleFilterPanel }) => (
  <button className="filter-button" onClick={toggleFilterPanel}>
    <i className="fas fa-filter"></i> {/* Add a filter icon */}
  </button>
);

export default FilterButton;
