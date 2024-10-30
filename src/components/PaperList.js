// components/PaperList.js
import React, { useEffect, useState } from 'react';
import { fetchSamplePapers } from '../services/api';
import { useNavigate } from 'react-router-dom';
import FilterPanel from './FilterPanel';

const PaperList = () => {
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadPapers = async () => {
      const data = await fetchSamplePapers();
      setPapers(data);
      setFilteredPapers(data);
      setYears([...new Set(data.map((paper) => paper.Year))]);
    };
    loadPapers();
  }, []);

  const handleFilterChange = (year) => {
    setSelectedYear(year);
    filterPapers(searchTerm, year);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterPapers(term, selectedYear);
  };

  const filterPapers = (term, year) => {
    const filtered = papers.filter((paper) =>
      (year ? paper.Year === parseInt(year) : true) &&
      (term
        ? (
            (paper.Title && paper.Title.toLowerCase().includes(term.toLowerCase())) ||
            (paper.Authors && paper.Authors.toLowerCase().includes(term.toLowerCase())) ||
            (paper.Abstract && paper.Abstract.toLowerCase().includes(term.toLowerCase()))
          )
        : true)
    );
    setFilteredPapers(filtered);
  };
  

  return (
    <div className="paper-list-container">
      <input
        className="search-bar"
        type="text"
        placeholder="Search (Title, Author, Abstract)"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <FilterPanel years={years} selectedYear={selectedYear} onFilterChange={handleFilterChange} />
      <div className="paper-list">
        {filteredPapers.map((paper) => (
          <div key={paper['Paper ID']} className="paper-card" onClick={() => navigate(`/paper/${paper['Paper ID']}`)}>
            <p className="paper-title">{paper.Title}</p>
            <p className="paper-authors">{paper.Authors}</p>
            <span className="paper-year">{paper.Year}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaperList;
