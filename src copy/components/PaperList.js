// components/PaperList.js
import React, { useState, useEffect, useCallback } from 'react';
import FilterPanel from './FilterPanel';
import { useNavigate } from 'react-router-dom';

const PaperList = ({ papers }) => {
  const [displayedPapers, setDisplayedPapers] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(50);
  const navigate = useNavigate();

  useEffect(() => {
    setDisplayedPapers(papers.slice(0, visibleCount))
    setYears([...new Set(papers.map((paper) => paper.year))]);
  }, [papers, visibleCount]);

  const toggleFilterPanel = () => setIsFilterPanelOpen(!isFilterPanelOpen);

  const filterPapers = (term, year) => {
    const filtered = papers.filter((paper) =>
      paper &&
      (!year || paper.year === parseInt(year)) &&
      (!term ||
        paper.title.toLowerCase().includes(term.toLowerCase()) ||
        (paper.author_names && paper.author_names.some(author => author.toLowerCase().includes(term.toLowerCase()))) ||
        (paper.abstract && paper.abstract.toLowerCase().includes(term.toLowerCase()))
      )
    );
    setDisplayedPapers(filtered.slice(0, visibleCount))
  };

  const handleFilterChange = (year) => {
    setSelectedYear(year);
    filterPapers(searchTerm, year);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterPapers(term, selectedYear);
  };

  const loadMorePapers = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      setVisibleCount((prevCount) => prevCount + 50)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', loadMorePapers);
    return () => window.removeEventListener('scroll', loadMorePapers);
  }, [loadMorePapers])
  
  return (
    <div className="app-container">
      <div className="filter-and-search">
        <button className="filter-button" onClick={toggleFilterPanel}>
          <i className="fas fa-filter"></i>
        </button>
        <input
          className="search-bar"
          type="text"
          placeholder="Search (Title, Author, Abstract)"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="content-container">
        {isFilterPanelOpen && (
          <FilterPanel
            isOpen={isFilterPanelOpen}
            onClose={toggleFilterPanel}
            years={years}
            selectedYear={selectedYear}
            onFilterChange={handleFilterChange}
          />
        )}
        <div className="paper-list">
            {displayedPapers.map((paper) => (
              paper ? (
                <div key={paper['paper_id']} className="paper-card" onClick={() => navigate(`/paper/${paper['paper_id']}`)}>
                <p className="paper-title">{paper.title}</p>
                <p className="paper-authors">{paper.author_names.join(", ")}</p>
                <span className="paper-year">{paper.year}</span>
                </div>
              ) : null
            ))}
        </div>
      </div>
    </div>
  );
};

export default PaperList;
