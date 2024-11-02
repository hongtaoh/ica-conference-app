// components/AuthorList.js
import React, { useState, useEffect, useCallback } from 'react';
import FilterPanel from './FilterPanel';
import { useNavigate } from 'react-router-dom';

const AuthorList = ( {authors} ) => {
  const [displayedAuthors, setDisplayedAuthors] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(50);
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure authors is not empty before running .slice() and .flatMap()
    if (authors && authors.length > 0) {
      setDisplayedAuthors(authors.slice(0, visibleCount));
      setYears([...new Set(authors.flatMap((author) => author.years_attended))]);
    }
  }, [authors, visibleCount]);

  const toggleFilterPanel = () => setIsFilterPanelOpen(!isFilterPanelOpen);

  const filterAuthors = (term, year) => {
    const filtered = authors.filter((author) =>
    (!year || (author.years_attended && author.years_attended.some(ayear => ayear === parseInt(year)))) &&
      (
        !term ||
        author.author_name.toLowerCase().includes(term.toLowerCase()) ||
        (author.affiliations && author.affiliations.some(aff => aff.toLowerCase().includes(term.toLowerCase())))
      )
    );
    setDisplayedAuthors(filtered.slice(0, visibleCount));
  };
  
  const handleFilterChange = (year) => {
    setSelectedYear(year);
    filterAuthors(searchTerm, year);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterAuthors(term, selectedYear);
  };

  const loadMoreAuthors = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      setVisibleCount((prevCount) => prevCount + 50)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', loadMoreAuthors);
    return () => window.removeEventListener('scroll', loadMoreAuthors);
  }, [loadMoreAuthors])

  const handleAuthorClick = (authorName) => {
    const formattedAuthorName = authorName.replace(/\s+/g, '_');  // Replace spaces with dashes
    navigate(`/papers/${encodeURIComponent(formattedAuthorName)}`);
  };

  return (
    <div className="app-container">
      <div className="filter-and-search">
        <button className="filter-button" onClick={toggleFilterPanel}>
          <i className="fas fa-filter"></i>
        </button>
        <input
          className="search-bar"
          type="text"
          placeholder="Search (Author, Affiliation)"
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
            {displayedAuthors.map((author) => (
            <div key={author['author_name']} className="paper-card" onClick={() => handleAuthorClick(author.author_name)}>
                <p className="paper-title">{author.author_name}</p>
                <p className="paper-authors">{author.affiliation_history}</p>
                <span className="paper-year">{author.attend_count} conferences attended, {author.paper_count} presentations given.</span>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorList;
