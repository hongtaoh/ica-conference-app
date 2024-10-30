// FilterButton.js
import React, { useState } from 'react';

const FilterButton = ({ label, isSelected, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      style={{
        backgroundColor: isSelected ? '#007bff' : '#f0f0f0',
        color: isSelected ? 'white' : 'black',
      }}
      className="filter-button"
    >
      {label}
    </button>
  );
};

export default FilterButton;
