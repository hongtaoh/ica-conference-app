// components/SessionList.js
import React, { useState, useEffect, useCallback } from 'react';
import FilterPanel from './FilterPanel';
import { useNavigate } from 'react-router-dom';

const SessionList = ( {sessions} ) => {
  const [displayedSessions, setDisplayedSessions] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(50);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessions && sessions.length > 0) {
      setDisplayedSessions(sessions.slice(0, visibleCount));
      setYears([...new Set(sessions.flatMap((session) => session.years))]);
    } else {
      setDisplayedSessions([]);
    }
  }, [sessions, visibleCount]);
  

  const toggleFilterPanel = () => setIsFilterPanelOpen(!isFilterPanelOpen);

  const filterSessions = (term, year) => {
    const filtered = sessions.filter((session) =>
      (!year || (session.years && session.years.includes(parseInt(year)))) &&
      (
        !term ||
        session.session.toLowerCase().includes(term.toLowerCase()) ||
        (session.chair_name && session.chair_name.toLowerCase().includes(term.toLowerCase())) ||
        (session.division && session.division.toLowerCase().includes(term.toLowerCase()))
      )
    );
    setDisplayedSessions(filtered.slice(0, visibleCount));
  };

  const handleFilterChange = (year) => {
    setSelectedYear(year);
    filterSessions(searchTerm, year);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterSessions(term, selectedYear);
  };

  const loadMoreSessions = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      setVisibleCount((prevCount) => prevCount + 50)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', loadMoreSessions);
    return () => window.removeEventListener('scroll', loadMoreSessions);
  }, [loadMoreSessions])

  const handleSessionClick = (sessionId) => {
    navigate(`/sessions/${sessionId}`);
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
          placeholder="Search (Session Title, Chair Name, Division)"
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
          {displayedSessions.map((session) => (
            <div key={session['session']} className="paper-card" onClick={() => handleSessionClick(session.session_id)}>
              <p className="paper-title">{session.session}</p>
              <p className="paper-details">{session.division}</p>
              {session.chair_name && session.chair_affiliation && (
                <span className="paper-year">
                  Chaired by {session.chair_name} from {session.chair_affiliation}
                </span>
              )}
              <span className="paper-year">
                {session.paper_count} {session.paper_count === 1 ? "paper" : "papers"} | Years: {session.years.join(", ")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SessionList;
