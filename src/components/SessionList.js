import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, TextField, MenuItem, Grid, Button, Typography, Box } from '@mui/material';

const SessionList = ({ sessions }) => {
  const [displayedSessions, setDisplayedSessions] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(50);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const filterSessions = useCallback((term, year) => {
    const filtered = sessions.filter((session) =>
      (!year || (session.years && session.years.includes(parseInt(year)))) &&
      (!term ||
        session.session.toLowerCase().includes(term.toLowerCase()) ||
        (session.chair_name && session.chair_name.toLowerCase().includes(term.toLowerCase())) ||
        (session.division && session.division.toLowerCase().includes(term.toLowerCase()))
      )
    );
    setDisplayedSessions(filtered.slice(0, visibleCount));
    setSearchParams({ search_term: term, filtered_year: year });
  }, [sessions, visibleCount, setSearchParams]);

  useEffect(() => {
    const initialTerm = searchParams.get('search_term') || '';
    const initialYear = searchParams.get('filtered_year') || '';

    setSearchTerm(initialTerm);
    setSelectedYear(initialYear);

    if (sessions && sessions.length > 0) {
      filterSessions(initialTerm, initialYear);
      setYears([...new Set(sessions.flatMap((session) => session.years))]);
    }
  }, [sessions, searchParams, visibleCount, filterSessions]);

  const handleFilterChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    filterSessions(searchTerm, year);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterSessions(term, selectedYear);
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedYear('');
    setDisplayedSessions(sessions.slice(0, visibleCount));
    setSearchParams({});
  };

  const loadMoreSessions = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      setVisibleCount((prevCount) => prevCount + 50);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', loadMoreSessions);
    return () => window.removeEventListener('scroll', loadMoreSessions);
  }, [loadMoreSessions]);

  const handleSessionClick = (sessionId) => {
    navigate(`/sessions/${sessionId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Search Sessions
      </Typography>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Search (Session Title, Chair Name, Division)"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            select
            label="Filter by Year"
            value={selectedYear}
            onChange={handleFilterChange}
            variant="outlined"
          >
            <MenuItem value="">All Years</MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={2}>
          <Button fullWidth variant="outlined" onClick={handleReset} sx={{ mt: 1 }}>
            Reset
          </Button>
        </Grid>
      </Grid>

      <div className="session-list">
        {displayedSessions.map((session) => (
          <Box key={session.session_id} sx={{ cursor: 'pointer', mb: 2 }} onClick={() => handleSessionClick(session.session_id)}>
            <Typography variant="h6" className="session-title">
              {session.session}
            </Typography>
            <Typography variant="body1" color="text.secondary" className="session-details">
              {session.division}
            </Typography>
            {session.chair_name && session.chair_affiliation && (
              <Typography variant="body2" color="text.secondary" className="session-chair">
                Chaired by {session.chair_name} from {session.chair_affiliation}
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary">
              {session.paper_count} {session.paper_count === 1 ? "paper" : "papers"} | Years: {session.years.join(", ")}
            </Typography>
          </Box>
        ))}
      </div>
    </Container>
  );
};

export default SessionList;
