// components/AllSessions.js
import React, { useState, useEffect } from 'react';
import { fetchSampleSessions } from '../services/API';
import FilterPanel from './FilterPanel';
import { useNavigate } from 'react-router-dom';

const AllSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadSessions = async () => {
      const data = await fetchSampleSessions();
      setSessions(data);
      setFilteredSessions(data);
      // Extract unique years from each session's years array
      const allYears = [...new Set(data.flatMap((session) => session.years))];
      setYears(allYears);
    };    
    loadSessions();
  }, []);

  const toggleFilterPanel = () => setIsFilterPanelOpen(!isFilterPanelOpen);

  const handleFilterChange = (year) => {
    setSelectedYear(year);
    filterSessions(searchTerm, year);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterSessions(term, selectedYear);
  };

  const filterSessions = (term, year) => {
    const filtered = sessions.filter((session) =>
      // Check if the selected year is within the session's years array
      (!year || (session.years && session.years.includes(parseInt(year)))) &&
      (
        !term ||
        session.session.toLowerCase().includes(term.toLowerCase()) ||
        (session.chair_name && session.chair_name.toLowerCase().includes(term.toLowerCase())) ||
        (session.division && session.division.toLowerCase().includes(term.toLowerCase()))
      )
    );
    setFilteredSessions(filtered);
  };

  const handleSessionClick = (sessionId) => {
    navigate(`/session/${sessionId}`);
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
          {filteredSessions.map((session) => (
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

export default AllSessions;
