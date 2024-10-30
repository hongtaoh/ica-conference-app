// components/FilterPanel.js
import React, { useState } from 'react';

const FilterPanel = ({ isOpen, onClose, years, onFilterChange }) => {
  const [selectedYear, setSelectedYear] = useState('');
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    onFilterChange({ year: event.target.value });
  };

  if (!isOpen) return null;

  return (
    <div className="filter-panel">
      <button className="close-button" onClick={onClose}>X</button>
      <h3>Filter by...</h3>

      <div className="filter-section">
        <label>Year</label>
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="">All</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

    </div>
  );
};

export default FilterPanel;
