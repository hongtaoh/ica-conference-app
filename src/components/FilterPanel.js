// components/FilterPanel.js
import React from 'react';

const FilterPanel = ({ isOpen, years, selectedYear, onFilterChange, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="filter-panel">
      <button className="close-button" onClick={onClose}>X</button>
      <h3>Filter by Year</h3>
      <select value={selectedYear} onChange={(e) => onFilterChange(e.target.value)}>
        <option value="">All</option>
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterPanel;
